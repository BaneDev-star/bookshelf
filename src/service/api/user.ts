import http from "./http_service";

export default class User {
  static fetchUserlogin(email: string, password: string) {
    return http.post('/auth/login', {
      username: email,
      password: password
    })
  }

  static fetchUserRegister(username: string, password: string) {
    return http.post('/auth/register', {
      username: username,
      password: password
    })
  }
}
