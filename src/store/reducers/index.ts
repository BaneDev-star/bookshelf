import {combineReducers} from "redux";
import users from './user';
import books from './books';

const rootReducer = combineReducers({
  users: users,
  books: books
});

export default rootReducer;
