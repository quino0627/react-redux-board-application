import { createAction, handleActions } from "redux-actions";
import { Map, fromJS } from "immutable";

import { pender } from "redux-pender";

import * as api from "../../lib/api";

//action types
const GET_POST = "post/GET_POST";

//action creators
export const getPost = createAction(GET_POST, api.getPost);

//initial state
const initialState = Map({
  post: Map({})
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
    })
  },
  initialState
);
