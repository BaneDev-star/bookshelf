import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "../constants/user";

const initialState = {
  loading: false,
  user: null
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return ({
        loading: true,
        user: null
      });
    case USER_LOGIN_SUCCESS:
      return ({
        loading: false,
        user: action.payload
      });
    case USER_LOGIN_FAIL:
      return ({
        loading: false,
        user: null
      });

    case USER_REGISTER_REQUEST:
      return ({
        loading: true,
        user: null
      });
    case USER_REGISTER_SUCCESS:
      return ({
        loading: false,
        user: action.payload
      });
    case USER_REGISTER_FAIL:
      return ({
        loading: false,
        user: null
      });
    default:
      return state;
  }
};

export default userReducer;
