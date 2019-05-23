import { createAction, handleActions } from "redux-actions";
import { Map, List, fromJS } from "immutable";

import { pender } from "redux-pender";

import * as api from "../../lib/api";

//action types
const GET_POST = "post/GET_POST";
const REMOVE_POST = "post/REMOVE_POST";
const GET_COMMENTLIST = "post/GET_COMMENTLIST";
const CHANGE_INPUT = "post/CHANGE_INPUT";
const WRITE_COMMENT = "post/WRITE_COMMENT";

//action creators
export const getPost = createAction(GET_POST, api.getPost);
export const removePost = createAction(REMOVE_POST, api.removePost);
export const getCommentList = createAction(
  GET_COMMENTLIST,
  api.getComment,
  meta => meta
);
export const changeInput = createAction(CHANGE_INPUT);
export const writeComment = createAction(WRITE_COMMENT, api.writeComment);

//initial state
const initialState = Map({
  post: Map({}),
  comments: List(),
  comment: ""
});

//reducer
export default handleActions(
  {
    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        console.log("IN HANDLEACTION, ", post[0]);
        return state.set("post", post[0]);
      },
      onFailure: (state, action, error) => {
        console.log(error);
      }
    }),
    ...pender({
      type: GET_COMMENTLIST,
      onSuccess: (state, action) => {
        const { data: comments } = action.payload;
        console.log("IN GET_COMMENTLIST", comments);
        return state.set("comments", comments);
      }
    }),
    [CHANGE_INPUT]: (state, action) => {
      const { payload: value } = action;
      return state.set("comment", value);
    },
    ...pender({
      type: WRITE_COMMENT,
      onSuccess: (state, action) => {
        console.log(action.payload.data);
      }
    })
  },
  initialState
);
