import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "../../lib/api";

//action types
const GET_POST_LIST = "list/GET_POST_LIST";
const GET_SEARCH_LIST = "list/GET_SEARCH_LIST";
const CHANGE_INPUT = "list/CHANGE_INPUT";
//action creators
export const getPostList = createAction(
  GET_POST_LIST,
  api.getPostList,
  meta => meta
);
export const getSearchList = createAction(GET_SEARCH_LIST, api.getSearchList);
export const changeInput = createAction(CHANGE_INPUT);

//initial state
const initialState = Map({
  posts: List(),
  lastPage: null,
  keyword: ""
});

//reducer
export default handleActions(
  {
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state, action) => {
        const { data: posts } = action.payload;
        const lastPage = action.payload.headers["last-page"];

        return state
          .set("posts", posts)
          .set("lastPage", parseInt(lastPage, 10));
      }
    }),
    ...pender({
      type: GET_SEARCH_LIST,
      onSuccess: (state, action) => {
        const { data: posts } = action.payload;
        console.log(posts);
        return state.set("posts", posts);
      }
    }),
    [CHANGE_INPUT]: (state, action) => {
      const { payload: value } = action;
      return state.set("keyword", value);
    }
  },

  initialState
);
