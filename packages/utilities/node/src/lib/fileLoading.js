import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import klaw from "klaw";

const ensureUniqueSlug = (slug, nameMap) => {
  if (nameMap[slug]) {
    nameMap[slug] = nameMap[slug] + 1;
    const modifiedSlug = `${slug}-${nameMap[slug]}`;
    return modifiedSlug;
  }

  nameMap[slug] = 1;
  return slug;
};

/**
 * Reads the data from a filepath
 * @param {string} filename Path to file
 * @returns {Promise} Resolves to a string of the file's contents
 */
const readFileAsync = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

/**
 * Parses a given JSON file
 * @param {string} path Path to file
 * @returns {Promise} Resolves to an object with the JSON file's parsed information
 */
const getSingleFileJson = async path => JSON.parse(await readFileAsync(path));

/**
 * Get the contents of a folder
 * @param {string} dir Path to folder collection
 * @param {string} ext File extension (with or without leading `.`)
 * @param {Promise} fileGetter Promise that returns data for a given file path
 * @param {function} createSlug Function that creates the slug from file data
 * @returns {array} Array of objects containing file data
 */
const getDirectory = async (
  dir,
  ext,
  fileGetter = false,
  createSlug = false
) => {
  const readdirAsync = dirname => {
    return new Promise((resolve, reject) => {
      fs.readdir(dirname, (err, filenames) => {
        if (err) reject(err);
        else resolve(filenames);
      });
    });
  };

  const files = await readdirAsync(dir).then(filenames =>
    filenames.filter(file => file.endsWith(ext))
  );

  return await Promise.all(
    files.map(async (filename, index) => {
      const fullFilepath = path.join(dir, filename);
      const nameMap = {};

      let contents;
      if (typeof fileGetter === "function")
        contents = await fileGetter(fullFilepath);
      else contents = await readFileAsync(fullFilepath);

      if (typeof createSlug === "function")
        contents.slug = ensureUniqueSlug(createSlug(contents), nameMap);

      contents = Object.assign(contents, {
        fullFilepath,
        filename,
        index
      });

      return contents;
    })
  );
};

/**
 * @deprecated since version 0.4.1
 */
const getYamlDirectory = async (dir, createSlugs = false) => {
  const directorySearchExt = ".yml";
  let directoryContents = await getDirectory(dir, directorySearchExt);
  directoryContents.forEach(async (fileContents, i) => {
    directoryContents[i] = yaml.safeLoad(fileContents.contents);
    directoryContents[i].fullFilepath = fileContents.fullFilepath;
    directoryContents[i].filename = fileContents.filename;
  });

  if (typeof createSlugs === "function") {
    directoryContents = createSlugsForArray(directoryContents, createSlugs);
  }

  return directoryContents;
};

/**
 * @deprecated since version 0.4.1
 */
const getMdDirectory = async (dir, createSlugs = false) => {
  const directorySearchExt = ".md";
  let directoryContents = await getDirectory(dir, directorySearchExt);
  directoryContents.forEach(async (fileContents, i) => {
    const matterData = matter(fileContents);
    delete matterData.orig;
    const fileData = matterData.data;
    fileData.body = matterData.content;

    directoryContents[i] = fileData;
    directoryContents[i].fullFilepath = fileContents.fullFilepath;
    directoryContents[i].filename = fileContents.filename;
  });

  if (typeof createSlugs === "function") {
    directoryContents = createSlugsForArray(directoryContents, createSlugs);
  }

  return directoryContents;
};

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
 * @deprecated since version 0.4.1
 * @param {string} location Path to folder collection
 * @param {string} extension File extension (with or without leading `.`)
 * @param {Promise} fileGetter Promise that returns data for a given file path
 * @param {function} createSlug Function that creates the slug from file data
 * @returns {array} Array of objects containing file data
 */
const getFolderCollection = (location, extension, fileGetter, createSlug) => {
  return new Promise((resolve, reject) => {
    const nameMap = {};

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
  getDirectory,
  getYamlDirectory,
  getMdDirectory,
  getSingleFileMd,
  getSingleFileYaml,
  getSingleFileJson,
  getFolderCollection,
  createSlugsForArray
};
