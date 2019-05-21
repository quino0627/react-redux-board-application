import axios from "axios";
import queryString from "query-string";

export const writePost = ({ title, body }) => {
  console.log("ASDF");
  return axios.post("/api/posts", {
    post_title: title,
    post_content: body,
    board_no: 3
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
