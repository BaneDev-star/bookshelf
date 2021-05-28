import {
  GET_BOOK_LIST_REQUEST,
  GET_BOOK_LIST_SUCCESS,
  GET_BOOK_LIST_FAIL
} from "../constants/books";

const initialState = {
  loading: false,
  books: []
};

const booksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_BOOK_LIST_REQUEST:
      return ({
        loading: true,
        books: []
      });
    case GET_BOOK_LIST_SUCCESS:
      return ({
        loading: false,
        books: action.payload
      });
    case GET_BOOK_LIST_FAIL:
      return ({
        loading: false,
        books: []
      });
    default:
      return state;
  }
};

export default booksReducer;
