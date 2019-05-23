import axios from "axios";
import queryString from "query-string";

export const writePost = async ({ title, body }) => {
  const loggedInfo = await checkLogin();
  console.log("AAAAAAAAAAAAAAA");
  console.log(loggedInfo.data.logged.username);
  return axios.post("/api/posts", {
    post_title: title,
    post_content: body,
    board_no: 3,
    writer: loggedInfo.data.logged.username
  });
};

export const getPost = id => {
  return axios.get(`/api/posts/${id}`);
};

export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);

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
