const services = {
  development: {
    base: "http://192.168.1.59:8080", // baseUrl
    // base: "http://192.168.1.52:28883", // baseUrl
    pool: "http://192.168.182.188:16884", // 模板库
    map: "http://192.168.1.51:8080", // 地图
  },
  test: {},
  production: {
    base: "http://192.168.1.52:28883", // baseUrl
    pool: "http://192.168.1.52:16884", // 模板库
    map: "http://192.168.1.51:8080", // 地图
  },
};

export default services;
