import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "../../lib/api";

const GET_MESSAGE_LIST = "message/GET_MESSAGE_LIST";
const SEND_MESSAGE = "message/SEND_MESSAGE";
const CHANGE_INPUT = "message/CHANGE_INPUT";

export const getMessageList = createAction(
  GET_MESSAGE_LIST,
  api.getMessageList
);
export const sendMessage = createAction(SEND_MESSAGE, api.sendMessage);
export const changeInput = createAction(CHANGE_INPUT);

const initialState = Map({
  receiver_username: "",
  message_content: "",
  messages: List()
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
    },
    ...pender({
      type: GET_MESSAGE_LIST,
      onSuccess: (state, action) => {
        console.log(action.payload.data[0]);
        const { data: messages } = action.payload;
        console.log("IN HANDLEACTION", messages);
        return state.set("messages", messages);
      }
    }),
    ...pender({
      type: SEND_MESSAGE,
      onSuccess: (state, action) => {
        console.log(action.payload.data);
      }
    })
  },
  initialState
);
