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
  console.log("GETPOST API");
  return axios.get(`/api/posts/${id}`);
};

export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);

export const editPost = ({ id, title, body, tags }) =>
  axios.patch(`/api/posts/${id}`, { post_title: title, post_content: body });

export const removePost = id => axios.delete(`/api/posts/${id}`);

export const login = (username, password) => {
  console.log(username, password);
  return axios.post("/api/auth/login", {
    username: username,
    password: password
  });
  // console.log(result);
};

export const checkLogin = () => axios.get("/api/auth/check");
export const logout = () => axios.post("/api/auth/logout");

export const register = (username, password) =>
  axios.post("api/auth/register", {
    username: username,
    password: password
  });
