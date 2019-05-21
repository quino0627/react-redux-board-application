import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import produce from "immer";
import { pender } from "redux-pender";
import * as api from "../../lib/api";

//action types
const INITIALIZE = "editor/INITIALIZE";
const CHANGE_INPUT = "editor/CHANGE_INPUT";
const WRITE_POST = "editor/WRITE_POST";
const GET_POST = "editor/GET_POST";
const EDIT_POST = "editor/EDIT_POST";

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST, api.editPost);
//initial state
const initialState = Map({
  title: "",
  markdown: "",
  tags: "",
  postId: null
});

//reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
    },
    ...pender({
      type: WRITE_POST,
      onSuccess: (state, action) => {
        console.log(action.payload.data);
        const { _id } = action.payload.data;
        return state.set("postId", _id);
      }
    }),
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        console.log(action.payload.data[0].post_title);
        const { post_title, post_content, tags } = action.payload.data[0];
        return state.set("title", post_title).set("markdown", post_content);
        // .set("tags", tags.join(", "));
      }
    })
  },
  initialState
);
