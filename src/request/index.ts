import axios from "axios";
import { sessionGetData } from "../hooks/useStorage";
let service = axios.create({
  baseURL: "http://localhost:8080",
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config: any) {
    //给需要验证token的接口添加authorization
    if (!config.url.match(/^\/user/)) {
      // 处理操作
      config.headers["Authorization"] = sessionGetData("token"); // 替换yourToken为实际的Token
    }
    return config;
  },
  function (error: any) {
    // 对请求错误做些什么
    console.log("请求错误");
    return Promise.reject(error);
  }
);

export default service;
