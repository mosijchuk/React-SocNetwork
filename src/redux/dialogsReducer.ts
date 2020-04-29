import {reset} from "redux-form";
import {DialogsAPI} from "../API/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {PhotosType} from "../types/types";

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
const START_UPDATE_NEW_MESSAGES = "START_UPDATE_NEW_MESSAGES";
const TO_VIEW_MESSAGE = "TO_VIEW_MESSAGE";
const SET_USERS_PHOTOS = "SET_USERS_PHOTOS";

type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
}
type DialogsType = Array<DialogType>

type MessageType = {
    id: string
    body: string
    translatedBody: string | null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}
type MessagesType = {
    items: Array<MessageType>
    totalCount: number
    error: null | string
}

const initialState = {
    dialogs: [] as DialogsType,
    messages: {
        items: [],
        totalCount: 0,
        error: null
    } as MessagesType,
    selectedDialog: null as number | null,
    selectedMessages: [] as Array<string>,
    editMode: {
        status: false,
        count: 0
    },
    isLoadingDialogs: true,
    isLoadingMessages: true,
    newMessagesCount: 0,
    startUpdateNewMessages: false,
    ownerPhoto: null as null | string,
    companionPhoto: null as null | string
};

type InitialStateType = typeof initialState
type ActionsType = SendMessageSuccessType |
    SetNewMessagesType |
    SetStartUpdateNewMessagesType |
    SetDialogsType |
    SetMessagesType |
    SelectDialogType |
    AddToSelectedMessagesType |
    RemoveFromSelectedMessagesType |
    SetLoadingMessagesType |
    SetLoadingDialogsType |
    ClearSelectedMessagesType |
    DeleteMessageType |
    SetEditModeType |
    SetUsersPhotosType |
    ToViewMessagesType


const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
        case START_UPDATE_NEW_MESSAGES:
            return {
                ...state,
                startUpdateNewMessages: action.isStart
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            };
        case SELECT_DIALOG:
            return {
                ...state,
                selectedDialog: action.selectedDialog
            };
        case SELECT_MESSAGE:
            return {
                ...state,
                selectedMessages: [...state.selectedMessages, action.selectedMessage]
            };
        case DESELECT_MESSAGE:
            return {
                ...state,
                selectedMessages: state.selectedMessages.filter((mes) => {
                    return mes !== action.messageId;
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
        case SET_USERS_PHOTOS:
            return {
                ...state,
                ownerPhoto: action.owner,
                companionPhoto: action.companion
            };
        case TO_VIEW_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: state.messages.items.filter(mes => {
                        if (mes.senderId != action.ownerId && mes.viewed === false) {
                            mes.viewed = true;
                        }
                        return mes;
                    }),
                    totalCount: state.messages.totalCount - 1
                }
            };
        default:
            return state;
    }
};


type SendMessageSuccessType = {
    type: typeof SEND_MESSAGE
    message: MessageType
}
const sendMessageSuccess = (message: MessageType): SendMessageSuccessType => ({
    type: SEND_MESSAGE,
    message
});

type SetNewMessagesType = {
    type: typeof SET_NEW_MESSAGES_COUNT
    count: number
}
const setNewMessagesCount = (count: number): SetNewMessagesType => ({
    type: SET_NEW_MESSAGES_COUNT,
    count
});

type SetStartUpdateNewMessagesType = {
    type: typeof START_UPDATE_NEW_MESSAGES
    isStart: boolean
}
const setStartUpdateNewMessages = (isStart: boolean): SetStartUpdateNewMessagesType => ({
    type: START_UPDATE_NEW_MESSAGES,
    isStart
});

type SetDialogsType = {
    type: typeof SET_DIALOGS
    dialogs: DialogsType
}
const setDialogs = (dialogs: DialogsType): SetDialogsType => ({
    type: SET_DIALOGS,
    dialogs
});

type SetMessagesType = {
    type: typeof SET_MESSAGES
    messages: MessagesType
}
const setMessages = (messages: MessagesType): SetMessagesType => ({
    type: SET_MESSAGES,
    messages
});

type SelectDialogType = {
    type: typeof SELECT_DIALOG
    selectedDialog: number | null
}
const selectDialog = (selectedDialog: number): SelectDialogType => ({
    type: SELECT_DIALOG,
    selectedDialog
});

type AddToSelectedMessagesType = {
    type: typeof SELECT_MESSAGE
    selectedMessage: string
}
const addToSelectedMessages = (selectedMessage: string): AddToSelectedMessagesType => ({
    type: SELECT_MESSAGE,
    selectedMessage
});

type RemoveFromSelectedMessagesType = {
    type: typeof DESELECT_MESSAGE
    messageId: string
}
const removeFromSelectedMessages = (messageId: string): RemoveFromSelectedMessagesType => ({
    type: DESELECT_MESSAGE,
    messageId
});

type SetLoadingMessagesType = {
    type: typeof IS_LOADING_MESSAGES
    loading: boolean
}
const setLoadingMessages = (loading: boolean): SetLoadingMessagesType => ({
    type: IS_LOADING_MESSAGES,
    loading
});

type SetLoadingDialogsType = {
    type: typeof IS_LOADING_DIALOGS
    loading: boolean
}
const setLoadingDialogs = (loading: boolean): SetLoadingDialogsType => ({
    type: IS_LOADING_DIALOGS,
    loading
});

type ClearSelectedMessagesType = {
    type: typeof DESELECT_ALL_MESSAGES
}
const clearSelectedMessages = (): ClearSelectedMessagesType => ({
    type: DESELECT_ALL_MESSAGES
});

type DeleteMessageType = {
    type: typeof DELETE_MESSAGE
    messageId: string
}
const deleteMessage = (messageId: string): DeleteMessageType => ({
    type: DELETE_MESSAGE,
    messageId
});

type EditModeType = {
    status: boolean
    count: number
}
type SetEditModeType = {
    type: typeof SET_EDIT_MODE
    editMode: EditModeType
}
const setEditMode = (editMode: EditModeType): SetEditModeType => ({
    type: SET_EDIT_MODE,
    editMode
});

type SetUsersPhotosType = {
    type: typeof SET_USERS_PHOTOS
    owner: string
    companion: string
}
const setUsersPhotos = (owner: string, companion: string): SetUsersPhotosType => ({
    type: SET_USERS_PHOTOS,
    owner,
    companion
});

type ToViewMessagesType = {
    type: typeof TO_VIEW_MESSAGE
    ownerId: number
}
const toViewMessages = (ownerId: number): ToViewMessagesType => ({
    type: TO_VIEW_MESSAGE,
    ownerId
});

//thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const sendMessage = (userId: number, message: string, formName: string): ThunkType => async (dispatch) => {
    await DialogsAPI.sendMessage(userId, message).then((response) => {
        if (response.data.resultCode === 0) {
            dispatch(sendMessageSuccess(response.data.data.message));
            dispatch(getDialogs());
            dispatch(reset(formName));
        }
    });
};

export const getDialogs = (): ThunkType => async (dispatch) => {
    await DialogsAPI.getDialogs().then((data) => {
        dispatch(setDialogs(data));
        dispatch(setLoadingDialogs(false));
        return data;
    });
};

///////check
export const checkNewMessages = (): ThunkType => async (dispatch, getState) => {
    let newMessagesCount = getState().dialogsPage.newMessagesCount;
    let isStarted = getState().dialogsPage.startUpdateNewMessages;
    let isLogged = getState().auth.isLogged;
    let checker = 0 as any;

    const check = () => {

        if (isLogged) {
            DialogsAPI.checkNewMessages().then((response) => {
                if (
                    (response.data && newMessagesCount != response.data) ||
                    newMessagesCount > 0
                ) {
                    dispatch(setNewMessagesCount(response.data));
                    dispatch(getDialogs());
                }
            });
        } else {
            clearInterval(checker);
            dispatch(setStartUpdateNewMessages(false));
        }
    };

    if (!isStarted && isLogged) {
        dispatch(setStartUpdateNewMessages(true));
        checker = setInterval(check, 3000);
    }
};

export const checkEditMode = (dispatch: any, getState: any): ThunkType => async (dispatch, getState) => {
    const selectedCount = getState().dialogsPage.selectedMessages.length;
    const isAnySelected = selectedCount > 0;
    const editMode = {
        status: isAnySelected,
        count: selectedCount
    };
    dispatch(setEditMode(editMode));
};

export const updateUsersPhotos = (dialogId: number): ThunkType => async (dispatch, getState) => {
    const ownerId = getState().auth.userId;
    const ownerPhoto = `https://social-network.samuraijs.com/activecontent/images/users/${ownerId}/user-small.jpg?v=37`;
    const companionPhoto = `https://social-network.samuraijs.com/activecontent/images/users/${dialogId}/user-small.jpg?v=37`;
    dispatch(setUsersPhotos(ownerPhoto, companionPhoto));
};

export const selectMessage = (messageId: string): ThunkType => async (dispatch) => {
    const message = messageId;
    dispatch(addToSelectedMessages(message));
};

export const deselectMessage = (messageId: string): ThunkType => async (dispatch) => {
    dispatch(removeFromSelectedMessages(messageId));
};

export const cancelSelectMessages = (): ThunkType => async (dispatch, getState) => {
    dispatch(clearSelectedMessages());
    dispatch(checkEditMode(dispatch, getState));
};

export const getMessages = (userId: number, invisible = false): ThunkType => async (
    dispatch,
    getState
) => {
    const ownerId = getState().auth.userId;
    if (!invisible) dispatch(setLoadingMessages(true));
    DialogsAPI.getMessages(userId).then((response) => {
        dispatch(setMessages(response.data));

        setTimeout(() => {
            ownerId && dispatch(toViewMessages(ownerId));
        }, 1000);

        if (!invisible) dispatch(setLoadingMessages(false));
    });
};

export const deleteSelectedMessages = (): ThunkType => async (dispatch, getState) => {
    const selectedMessages = getState().dialogsPage.selectedMessages;
    selectedMessages.map((mesId) => {
        DialogsAPI.deleteMessage(mesId).then((response) => {
            dispatch(deleteMessage(mesId));
            dispatch(deselectMessage(mesId));
            dispatch(checkEditMode(dispatch, getState));
        });
    });
};

export const setDialog = (dialog: number): ThunkType => async (dispatch) => {
    dispatch(cancelSelectMessages());
    dispatch(selectDialog(dialog));
    dispatch(getMessages(dialog));
    dispatch(updateUsersPhotos(dialog));
};

export default dialogsReducer;
