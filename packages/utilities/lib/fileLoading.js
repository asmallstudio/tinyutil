import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import klaw from "klaw";
import path from "path";

/**
 * Parses the information of a markdown file with front matter
 * in YAML
 * @param {string} path Path to file
 * @returns {Promise} Resolves to an object with the markdown file's parsed information
 */
const getSingleFileMd = path => {
  return new Promise(resolve => {
    if (fs.existsSync(path)) {
      const rawData = fs.readFileSync(path, "utf8");
      const matterData = matter(rawData);
      delete matterData.orig;

      const fileData = matterData.data;
      fileData.body = matterData.content;
      resolve(fileData);
    } else {
      resolve(null);
    }
  });
};

/**
 * Parses the information of a YAML file
 * @param {string} path Path to file to be read
 * @returns {Promise} Resolves to an object with the YAML file's parsed information
 */
const getSingleFileYaml = path => {
  return new Promise(resolve => {
    resolve(yaml.safeLoad(fs.readFileSync(path, "utf8")));
  });
};

/**
 * Get folder collection data
 * @param {string} location Path to folder collection
 * @param {string} extension File extension (with or without leading `.`)
 * @param {Promise} fileGetter Promise that returns data for a given file path
 * @param {function} createSlug Function that creates the slug from file data
 * @returns {array} Array of objects containing file data
 */
const getFolderCollection = (location, extension, fileGetter, createSlug) => {
  return new Promise((resolve, reject) => {
    const nameMap = {};

    function ensureUniqueSlug(slug, nameMap) {
      if (nameMap[slug]) {
        nameMap[slug] = nameMap[slug] + 1;
        const modifiedSlug = `${slug}-${nameMap[slug]}`;
        return modifiedSlug;
      }

      nameMap[slug] = 1;
      return slug;
    }

    const items = [];
    if (fs.existsSync(location)) {
      klaw(location)
        .on("data", async item => {
          let searchExt = extension;
          // Ensure leading `.` is added to file extension.
          if (searchExt.charAt(0) !== ".") searchExt = ".".concat(searchExt);
          if (path.extname(item.path) === searchExt) {
            const data = await fileGetter(item.path);
            data.slug = ensureUniqueSlug(createSlug(data), nameMap);
            items.push(data);
          }
        })
        .on("error", e => {
          reject(e);
        })
        .on("end", () => {
          resolve(items);
        });
    } else {
      resolve(items);
    }
  });
};

/**
 * Returns a hydrated object with all items with keyword hydrated
 * @param {string} data data object or array to be hydrated
 * @param {string | boolean} singleCollection
 * @param {array} requestedObjects
 * @returns {array | object} Returns an array or object, same as data, with hydrated relations.
 */
const hydrateRelations = async (data, singleCollection, requestedObjects) => {
  const KEYWORD = "_relation";

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = await hydrateRelations(
        data[i],
        singleCollection,
        requestedObjects
      );
    }
  } else if (typeof data === "object") {
    for (const property in data) {
      if (property === KEYWORD) {
        // eslint-disable-next-line no-param-reassign
        data = Object.assign(
          {},
          data,
          await hydrateItem(data[property], singleCollection, requestedObjects)
        );
        delete data[KEYWORD]; // Remove relation getting data.
      } else {
        data[property] = await hydrateRelations(
          data[property],
          singleCollection,
          requestedObjects
        );
      }
    }
  }
  return data;
};

/**
 * @param {object} item
 * @param {string | boolean} singleCollection
 * @param {array} requestedObjects
 */
const hydrateItem = async (item, singleCollection, requestedObjects) => {
  let projectDataFileName = item.toLowerCase().replace(/ /g, "-");
  let dataPathSuffix;
  let urlPathPrefix;
  let newRequestedObjects = requestedObjects;

  if (singleCollection !== false) {
    if (singleCollection === "projects") {
      dataPathSuffix = "projects";
      urlPathPrefix = "projects";
    }
    if (singleCollection === "team") {
      dataPathSuffix = "team";
      urlPathPrefix = "studio";
    }
  } else {
    if (item.includes("/")) {
      const fullSlugParts = projectDataFileName.split("/");
      projectDataFileName = fullSlugParts.slice(-1)[0];
      if (fullSlugParts[0] === "projects" || fullSlugParts[0] === "project") {
        dataPathSuffix = "projects";
        urlPathPrefix = "projects";
        newRequestedObjects = ["title", "featureImage", "link"];
      } else if (fullSlugParts[0] === "team" || fullSlugParts[0] === "studio") {
        dataPathSuffix = "team";
        urlPathPrefix = "studio";
        newRequestedObjects = ["title", "jobTitle", "image", "link"];
      }
    }
  }

  return await getRelationData(
    projectDataFileName,
    dataPathSuffix,
    urlPathPrefix,
    newRequestedObjects
  );
};

/**
 *
 * @param {*} item
 * @param {*} dataIsObject
 * @param {*} hydrateObjectKey
 * @param {*} dataPathSuffix
 * @param {*} urlPathPrefix
 * @param {*} requestedObjects
 * @returns {object} requested relations object data
 */
const getRelationData = async (
  projectDataFileName,
  dataPathSuffix,
  urlPathPrefix,
  requestedObjects
) => {
  const singleRequestedRelationData = {};
  const filePath = `./src/data/${dataPathSuffix}/${projectDataFileName}.yml`;
  const relationData = await getSingleFileYaml(filePath);
  for (const requestedObject of requestedObjects) {
    if (requestedObject === "link") {
      singleRequestedRelationData[
        requestedObject
      ] = `/${urlPathPrefix}/${projectDataFileName}`;
    } else {
      singleRequestedRelationData[requestedObject] =
        relationData[requestedObject];
    }
  }
  return singleRequestedRelationData;
};

/**
 * Create slugs for each element in the array
 * @param {array} dataArray Array of data objects
 * @param {function} createSlug Takes in a data object and creates a slug
 * @returns {string} Created slug
 */
const createSlugsForArray = (dataArray, createSlug) => {
  return dataArray.map(dataObj => {
    dataObj.slug = createSlug(dataObj);
    return dataObj;
  });
};

export {
  getSingleFileMd,
  getSingleFileYaml,
  getFolderCollection,
  hydrateRelations,
  createSlugsForArray
};
