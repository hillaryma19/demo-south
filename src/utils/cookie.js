import Cookie from 'js-cookie';

/**
* function:        		设置cookie
* @param name			name为cookie名称
* @param value			value为cookie值
* @param time			time为cookie过期时间
* @returns{string}   	cookie
*/
export const setCookie = (name, value, time) => {
    return Cookie.set(name, value, { expires: time ? time : 30 });
};

/**
* function:        		获取cookie
* @param name			name为cookie名称
* @returns{string}   	cookie
*/
export const getCookie = (name) => {
    return Cookie.get(name);
};

/**
* function:        		清除cookie
* @param name			name为cookie名称
* @returns{string}   	cookie
*/
export const removeCookie = (name) => {
    return Cookie.remove(name);
};

