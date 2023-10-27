import service from "../..";
// 检测用户名是否存在
export function checkIfUserExist(username: String) {
  return service({
    method: "post",
    url: "/user/checkIfUserExist",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      username: username,
    },
  });
}

// 注册
export function reguser(username: String, password: String, role: Number) {
  return service({
    method: "post",
    url: "/user/reguser",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      username: username,
      password: password,
      roleid: role,
    },
  });
}

// 登录
export function login(username: String, password: String) {
  return service({
    method: "post",
    url: "/user/login",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      username: username,
      password: password,
    },
  });
}
