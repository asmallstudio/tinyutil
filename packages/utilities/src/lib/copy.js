/**
 * Strips phone number string of all but + symbold and digits
 * @param {string} A string representing a phone number
 * @returns {string} A phone number with no characters besides digits and a +
 * @link https://www.regexpal.com/?fam=105221
 */
const phoneNumberUnformat = phone => phone.replace(/[^+0-9]/g, "");

/**
 * Checks for value in text string.
 * @param {string} text A string that may be empty, meaningless, and devoid of life
 * @returns {boolean} If string has value, return true
 */
const hasTextValue = text => text.trim().length > 0;

/**
 * Returns first string that is not valueless
 * @param  {...string} stringArgs strings - may be valueless
 * @returns {string | undefined} First string that is not valueless, or undefined
 */
const pickFirstAvailableString = (...stringArgs) =>
  stringArgs.find(hasTextValue);

/**
 * Create complete page title
 * @param {string} title Page title
 * @returns Full page title
 */
const getFullPageTitle = (pageTitle, siteTitle) =>
  `${pageTitle} | ${siteTitle}`;

/**
 * Create complete page title
 * @param {string} title Page title
 * @returns Full page title
 */
const getAbsoluteUrl = (itemUrl, siteURL) => `${siteURL}${itemUrl}`;

/**
 * Create a relative (e.g. 3 days ago) date string from current and previous date
 * @param {string} dateString Date string, parsable by Date.parse()
 * @returns {string} Relative date string
 */
const formatRelativeDateString = dateString => {
  // Demo: https://jsfiddle.net/shooter/YXUwF/
  const current = Date.now();
  const previous = Date.parse(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} days ago`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} months ago`;
  }
  return `${Math.round(elapsed / msPerYear)} years ago`;
};

/**
 * Sanitize input string
 * @param {string} string Input
 * @returns {string} Sanitized string
 */
const sanitizeString = string => {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * Create date string from JS date instance
 * @param {object} date JS date instance
 * @returns {string} YYYY-MM-DD string
 */
const formatDateObjectToYYYYMMDD = date => {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-"); // getMonth() is 0 based index
};

/**
 * Create slug from title and date
 * @returns {string} URL safe slug
 */
const createSlugFromTitleAndDate = data => {
  const { title, date } = data;

  const dateObj = new Date(date);
  const formattedDate = formatDateObjectToYYYYMMDD(dateObj);
  const sanitizedTitle = sanitizeString(title);

  return `${formattedDate}-${sanitizedTitle}`;
};

/**
 * Create slug from title
 * @param {object} data File data
 * @returns {string} Created Slug
 */
const createSlugFromTitle = data => {
  return sanitizeString(data.title);
};

export {
  phoneNumberUnformat,
  pickFirstAvailableString,
  getFullPageTitle,
  getAbsoluteUrl,
  formatRelativeDateString,
  createSlugFromTitleAndDate,
  createSlugFromTitle
};
