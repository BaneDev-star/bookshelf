import http from "./http_service";

export default class Books {
  static fetchBooks(token: string, query = '') {
    http.setAuthorizationHeader('Bearer ' + token);
    return http.get(`/books?q=${query}`);
  }

  static fetchBookDetail(token: string, id: string) {
    http.setAuthorizationHeader('Bearer ' + token);
    return http.get(`/books/${id}`);
  }
}
