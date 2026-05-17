import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
  isAdmin: false,
  user: {},
  footerLoading: false,
  subscription: {},
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    email: null,
    isAuthenticated: false,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    email: action.email,
    token: action.token,
    isAuthenticated: action.isAuthenticated,
    isAdmin: action.isAdmin,
    user: action.user,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    isAuthenticated: action.isAuthenticated,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    email: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    user: {},
  });
};

const setFooterLoading = (state, action) => {
  return updateObject(state, {
    footerLoading: action.loading,
  });
};

const setSubscription = (state, action) => {
  return updateObject(state, {
    subscription: action.subscription,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FOOTER_LOADING:
      return setFooterLoading(state, action);
    case actionTypes.SUBS_DETS:
      return setSubscription(state, action);
    default:
      return state;
  }
};

export default reducer;
