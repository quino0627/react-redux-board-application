import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configure from "./store/configure";

const store = configure();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;

//Root component에서 configure 함수를 호출하여 스토어를 생성, Provider 컴포넌트로 BrowserRouter를 감싼다.
