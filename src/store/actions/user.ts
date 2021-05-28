import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS, USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "../constants/user";

export function userLoginRequest() {
  return {
    type: USER_LOGIN_REQUEST
  }
}

export function userLoginSuccess(account: object) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: account
  }
}

export function userLoginFail() {
  return {
    type: USER_LOGIN_FAIL
  }
}

export function userRegisterRequest() {
  return {
    type: USER_REGISTER_REQUEST
  }
}

export function userRegisterSuccess(books: []) {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: books
  }
}

export function userRegisterFail() {
  return {
    type: USER_REGISTER_FAIL
  }
}
