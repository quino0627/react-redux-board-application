import axios from "axios";

export const writePost = ({ title, body, tags }) => {
  console.log("ASDF");
  return axios.post("/api/posts", { title, body, tags });
};

export const getPost = id => {
  console.log("GETPOST API");
  return axios.get(`/api/posts/${id}`);
};
