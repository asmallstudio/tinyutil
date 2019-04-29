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
  // console.log("getSingleFileMd:", path);
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
  // console.log("getSingleFileYaml:", path);
  return new Promise(resolve => {
    // console.log(yaml.safeLoad(fs.readFileSync(path, "utf8")));
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
  createSlugsForArray
};
