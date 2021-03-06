import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "../../lib/api";
//action types
const SHOW_MODAL = "base/SHOW_MODAL";
const HIDE_MODAL = "base/HIDE_MODAL";
const LOGIN = "base/LOGIN";
const LOGOUT = "base/LOGOUT";
const CHECK_LOGIN = "base/CHECK_LOGIN";
const CHANGE_PASSWORD_INPUT = "base/CHANGE_PASSWORD_INPUT";
const CHANGE_USERNAME_INPUT = "base/CHANGE_USERNAME_INPUT";
const INITIALIZE_LOGIN_MODAL = "base/INITIALIZE_LOGIN_MODAL";
const TEMP_LOGIN = "base/TEMP_LOGIN";

const REGISTER = "base/REGISTER";
const INITIALIZE_REGISTER_MODAL = "base/INITIALIZE_REGISTER_MODAL";

//action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const changeUsernameInput = createAction(CHANGE_USERNAME_INPUT);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const tempLogin = createAction(TEMP_LOGIN);

export const register = createAction(REGISTER, api.register);
export const initializeRegisterModal = createAction(INITIALIZE_REGISTER_MODAL);
//initial state
// initial state
const initialState = Map({
  // 모달의 가시성 상태
  modal: Map({
    remove: false,
    login: false,
    register: false
  }),
  // 로그인 모달 상태
  loginModal: Map({
    password: "",
    username: "",
    error: false
  }),
  registerModal: Map({
    password: "",
    username: "",
    error: false
  }),
  logged: false // 현재 로그인 상태
});

//reducer
export default handleActions(
  {
    [SHOW_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return state.setIn(["modal", modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return state.setIn(["modal", modalName], false);
    },
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => {
        // 로그인 성공 시
        console.log("ONSUCCESS");
        return state.set("logged", true);
      },
      onFailure: (state, action) => {
        console.log("FAILED");
        // 에러 발생 시
        return state
          .setIn(["loginModal", "error"], true)
          .setIn(["loginModal", "password"], "")
          .setIn(["loginModal", "username"], "");
      },
      onError: (state, action) => {
        console.log("FAILED");
        // 에러 발생 시
        return state
          .setIn(["loginModal", "error"], true)
          .setIn(["loginModal", "password"], "")
          .setIn(["loginModal", "username"], "");
      }
    }),
    ...pender({
      type: CHECK_LOGIN,
      onSuccess: (state, action) => {
        console.log("CHECKLOGIN");
        const { logged } = action.payload.data;
        return state.set("logged", logged);
      }
    }),
    ...pender({
      type: REGISTER,
      onSuccess: (state, action) => {
        // 로그인 성공 시
        console.log("ONSUCCESS");
        // return state.set("logged", true);
      },
      onFailure: (state, action) => {
        console.log("FAILED");
        // 에러 발생 시
        return state
          .setIn(["registerModal", "error"], true)
          .setIn(["registerModal", "password"], "")
          .setIn(["registerModal", "username"], "");
      },
      onError: (state, action) => {
        console.log("FAILED");
        // 에러 발생 시
        return state
          .setIn(["registerModal", "error"], true)
          .setIn(["registerModal", "password"], "")
          .setIn(["registerModal", "username"], "");
      }
    }),
    [CHANGE_PASSWORD_INPUT]: (state, action) => {
      const { payload: value } = action;
      return state.setIn(["loginModal", "password"], value);
    },
    [CHANGE_USERNAME_INPUT]: (state, action) => {
      const { payload: value } = action;
      return state.setIn(["loginModal", "username"], value);
    },
    [INITIALIZE_LOGIN_MODAL]: (state, action) => {
      // 로그인 모달의 상태를 초기상태로 설정합니다 (텍스트/에러 초기화)
      return state.set("loginModal", initialState.get("loginModal"));
    },
    [TEMP_LOGIN]: (state, action) => {
      return state.set("logged", true);
    }
  },
  initialState
);
