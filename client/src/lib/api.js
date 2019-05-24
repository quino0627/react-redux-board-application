import axios from "axios";
import queryString from "query-string";
import { actionTypes } from "redux-pender/lib/utils";

export const writePost = async ({ title, body, board_no }) => {
  console.log(board_no);
  const loggedInfo = await checkLogin();
  return axios.post("/api/posts", {
    post_title: title,
    post_content: body,
    board_no: board_no,
    writer: loggedInfo.data.logged.username
  });
};

export const getPost = id => {
  return axios.get(`/api/posts/${id}`);
};

export const getPostList = ({ tag, page, board_no }) => {
  if (board_no === -1) {
    console.log("BOARDNO IS -1");
    return axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);
  } else {
    console.log("BOARDNO IS ", board_no, typeof board_no);
    console.log(page);
    console.log(queryString.stringify(page));
    return axios.get(`/api/posts/board/${board_no}/?page=${page}`);
  }
};

export const editPost = ({ id, title, body, tags }) =>
  axios.patch(`/api/posts/${id}`, { post_title: title, post_content: body });

export const removePost = id => axios.delete(`/api/posts/${id}`);

export const login = (username, password) => {
  return axios.post("/api/auth/login", {
    username: username,
    password: password
  });
};

export const checkLogin = () => axios.get("/api/auth/check");
export const logout = () => axios.post("/api/auth/logout");

export const register = (username, password) =>
  axios.post("api/auth/register", {
    username: username,
    password: password
  });

export const writeComment = async ({ id, body }) => {
  return axios.post(`/api/posts/comments/${id}`, {
    comments_content: body
  });
};

export const getComment = async ({ id }) => {
  return axios.get(`/api/posts/comments/${id}`);
};

export const getSearchList = async ({ keyword }) => {
  return axios.get(`/api/posts/search/?keyword=${keyword}`);
};
