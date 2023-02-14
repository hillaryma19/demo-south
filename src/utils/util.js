
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const USERAGENT = window.navigator.userAgent.toLowerCase();

export const isMac = () => {
  return /macintosh|mac os x/i.test(USERAGENT);
};

export const isWindows = () => {
  if (
    USERAGENT.indexOf("win32") >= 0 ||
    USERAGENT.indexOf("wow32") >= 0 ||
    USERAGENT.indexOf("win64") >= 0 ||
    USERAGENT.indexOf("wow64") >= 0
  ) {
    return true;
  } else {
    return false;
  }
};
