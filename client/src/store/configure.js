//스토어를 생성하는 함수인 configure를 구현하는 파일
//스토어를 클라이언트에서 생성하지만 추후 SSR을 할 때 서버에서도 호출해야 하기 때문이다.
//만든 모듈들을 combineReducers로 합쳐 주고, penderMiddleware도 적용한다.

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import penderMiddleware from "redux-pender";
import * as modules from "./modules";

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

//개발 모드일 때만 Redux Devtools를 적용한다.
const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

//preloadedState는 SSR을 했을 때 전달받는 초기 상태임
const configure = preloadedState =>
  createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
//스토어를 생성할 준비 끝
