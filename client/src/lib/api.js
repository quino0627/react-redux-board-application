import axios from "axios";

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
