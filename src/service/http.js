import axios from "axios";
import { Message } from "element-ui";
const $https = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

//添加一个请求拦截器
$https.interceptors.request.use(
  (config) => {
    // config.headers.loginToken = "";//token
    // }
    return config;
  },
  (err) => {
    //Do something with request error
    return Promise.reject(err);
  }
);
//添加一个响应拦截器
$https.interceptors.response.use(
  (res) => {
    //在这里对返回的数据进行处理
    if (res.status != 200) {
      Message({ message: res.data.message, type: "warning" });
    }
    return res.data ? res.data : {};
  },
  (err) => {
    if (err && err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          Message({ message: "请求不存在", type: "warning" });
          break;
        case 500:
          Message({ message: "服务器繁忙", type: "warning" });
          break;
        case 502:
          Message({ message: "服务器繁忙", type: "warning" });
          break;
        default:
          Message({ message: "服务器繁忙", type: "warning" });
          break;
      }
    } else {
      Message({ message: "服务器繁忙", type: "warning" });
    }
    return Promise.reject(err);
  }
);

function $post(url, postData) {
  return $https.post(url, postData);
}
function $get(url, params) {
  return $https.get(url, { params: params });
}

export default {
  $post,
  $get,
};
