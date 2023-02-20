//正则表达式
export const telReg = /^1[23456789]\d{9}$/;
export const acountReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{4,20}$/;
export const nameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
//至少6~20位非空字符，是字母数字或符号两种或两种以上
export const pwdReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
export const emailReg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
export const phReg = /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
export const intReg = /^\+?[1-9][0-9]*$/;
export const payReg = /^\d{6}$/; //支付密码校验
export const intOnly = (val) => {
  val = Number(val);
  return /^\+?[1-9][0-9]*$/.test(val); //正整数
};

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
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
