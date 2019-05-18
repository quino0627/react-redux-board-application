import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import produce from "immer";
import { pender } from "redux-pender";

//action types
const INITIALIZE = "editor/INITIALIZE";
const CHANGE_INPUT = "editor/CHANGE_INPUT";

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);

//initial state
const initialState = {
  title: "",
  markdown: "",
  tags: ""
};

//reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => {
      return initialState;
    },
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        const { name, value } = action.payload;
        eval("draft." + name + "=value");
        // draft.title = value;
      })
  },
  initialState
);
