import { reset } from "redux-form";
import { DialogsAPI } from "../API/api";

const SEND_MESSAGE = "SEND-MESSAGE";
const SET_DIALOGS = "SET_DIALOGS";
const SET_MESSAGES = "SET_MESSAGES";
const SELECT_DIALOG = "SELECT_DIALOG";
const SELECT_MESSAGE = "SELECT_MESSAGE";
const DESELECT_MESSAGE = "DESELECT_MESSAGE";
const DESELECT_ALL_MESSAGES = "DESELECT_ALL_MESSAGES";
const SET_EDIT_MODE = "SET_EDIT_MODE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const IS_LOADING_DIALOGS = "IS_LOADING_DIALOGS";
const IS_LOADING_MESSAGES = "IS_LOADING_MESSAGES";
const SET_NEW_MESSAGES_COUNT = "SET_NEW_MESSAGES_COUNT";

let initialState = {
  dialogs: [],
  messages: {
    items: [],
    totalCount: 0,
    error: null
  },
  selectedDialog: null,
  selectedMessages: [],
  editMode: {
    status: false,
    count: 0
  },
  isLoadingDialogs: true,
  isLoadingMessages: true,
  newMessagesCount: 0
};
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          items: [...state.messages.items, action.message],
          totalCount: state.messages.totalCount + 1
        }
      };
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.dialogs
      };
    case SET_NEW_MESSAGES_COUNT:
      return {
        ...state,
        newMessagesCount: action.count
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };
    case SELECT_DIALOG:
      return {
        ...state,
        selectedDialog: action.dialog
      };
    case SELECT_MESSAGE:
      return {
        ...state,
        selectedMessages: [...state.selectedMessages, action.selectedMessage]
      };
    case DESELECT_MESSAGE:
      return {
        ...state,
        selectedMessages: state.selectedMessages.filter(mes => {
          return mes.id !== action.messageId;
        })
      };
    case DESELECT_ALL_MESSAGES:
      return {
        ...state,
        selectedMessages: []
      };
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.editMode
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          items: state.messages.items.filter(mes => {
            return mes.id !== action.messageId;
          }),
          totalCount: state.messages.totalCount - 1
        }
      };
    case IS_LOADING_MESSAGES:
      return {
        ...state,
        isLoadingMessages: action.loading
      };
    case IS_LOADING_DIALOGS:
      return {
        ...state,
        isLoadingDialogs: action.loading
      };
    default:
      return state;
  }
};

let sendMessageSuccess = message => ({
  type: SEND_MESSAGE,
  message
});

let setNewMessagesCount = count => ({
  type: SET_NEW_MESSAGES_COUNT,
  count
});

let setDialogs = dialogs => ({
  type: SET_DIALOGS,
  dialogs
});

let setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

let selectDialog = selectedDialog => ({
  type: SELECT_DIALOG,
  selectedDialog
});

let addToSelectedMessages = selectedMessage => ({
  type: SELECT_MESSAGE,
  selectedMessage
});

let removeFromSelectedMessages = messageId => ({
  type: DESELECT_MESSAGE,
  messageId
});

let setLoadingMessages = loading => ({
  type: IS_LOADING_MESSAGES,
  loading
});

let setLoadingDialogs = loading => ({
  type: IS_LOADING_DIALOGS,
  loading
});

let clearSelectedMessages = () => ({
  type: DESELECT_ALL_MESSAGES
});

let deleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  messageId
});

let setEditMode = editMode => ({
  type: SET_EDIT_MODE,
  editMode
});

//thunkx

export let sendMessage = (userId, message, formName) => dispatch => {
  DialogsAPI.sendMessage(userId, message).then(response => {
    console.log(response);
    if (response.data.resultCode === 0) {
      dispatch(sendMessageSuccess(response.data.data.message));
      dispatch(reset(formName));
    }
  });
};

export let getDialogs = () => dispatch => {
  dispatch(setLoadingDialogs(true));
  return DialogsAPI.getDialogs().then(response => {
    dispatch(setDialogs(response.data));
    dispatch(setLoadingDialogs(false));
    return response;
  });
};

export let checkNewMessages = () => (dispatch, getState) => {
  const newMessagesCount = getState().dialogsPage.newMessagesCount;
  const check = () => {
    DialogsAPI.checkNewMessages().then(response => {
      if (response.data && newMessagesCount != response.data) {
        dispatch(setNewMessagesCount(response.data));
      }
    });
  };
  setInterval(check, 3000);
};

export let checkEditMode = (dispatch, getState) => (dispatch, getState) => {
  const selectedCount = getState().dialogsPage.selectedMessages.length;
  const isAnySelected = selectedCount > 0;
  const editMode = {
    status: isAnySelected,
    count: selectedCount
  };
  dispatch(setEditMode(editMode));
};

export let selectMessage = messageId => dispatch => {
  const message = {
    id: messageId
  };
  dispatch(addToSelectedMessages(message));
};

export let deselectMessage = messageId => dispatch => {
  dispatch(removeFromSelectedMessages(messageId));
};

export let cancelSelectMessages = () => (dispatch, getState) => {
  dispatch(clearSelectedMessages());
  dispatch(checkEditMode(dispatch, getState));
};

export let getMessages = userId => dispatch => {
  dispatch(setLoadingMessages(true));
  DialogsAPI.getMessages(userId).then(response => {
    dispatch(setMessages(response.data));
    dispatch(setLoadingMessages(false));
  });
};

export let deleteSelectedMessages = () => (dispatch, getState) => {
  const selectedMessages = getState().dialogsPage.selectedMessages;
  selectedMessages.map(mes => {
    DialogsAPI.deleteMessage(mes.id).then(response => {
      dispatch(deleteMessage(mes.id));
      dispatch(deselectMessage(mes.id));
      dispatch(checkEditMode(dispatch, getState));
    });
  });
};

export let setDialog = dialog => dispatch => {
  dispatch(cancelSelectMessages());
  dispatch(selectDialog(dialog));
  dispatch(getMessages(dialog));
};

export default dialogsReducer;
