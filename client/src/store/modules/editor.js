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
const SELECT_RADIO = "editor/SELECT_RADIO";

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST, api.editPost);
export const selectRadio = createAction(SELECT_RADIO);
//initial state
const initialState = Map({
  title: "",
  markdown: "",
  tags: "",
  postId: null,
  board_no: null
});

//reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
    },
    [SELECT_RADIO]: (state, action) => {
      const { board_no } = action.payload;
      console.log("AT HANDLEACIOTNs");
      console.log(board_no, typeof board_no);
      return state.set("board_no", board_no);
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
        console.log(action.payload.data[0].board_no);
        const { post_title, post_content, board_no } = action.payload.data[0];
        return state
          .set("title", post_title)
          .set("markdown", post_content)
          .set("board_no", board_no);
        // .set("tags", tags.join(", "));
      }
    })
  },
  initialState
);
