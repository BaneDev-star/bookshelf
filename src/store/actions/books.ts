import {GET_BOOK_LIST_FAIL, GET_BOOK_LIST_REQUEST, GET_BOOK_LIST_SUCCESS} from "../constants/books";
import {IBookProps} from "../props";


export function getBookListRequest() {
  return {
    type: GET_BOOK_LIST_REQUEST
  }
}

export function getBookListSuccess(books: IBookProps[]) {
  return {
    type: GET_BOOK_LIST_SUCCESS,
    payload: books
  }
}

export function getBookListFail() {
  return {
    type: GET_BOOK_LIST_FAIL
  }
}
