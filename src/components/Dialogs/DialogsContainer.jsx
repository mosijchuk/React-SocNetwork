import React from "react";
import {connect} from "react-redux";
import {
    cancelSelectMessages,
    checkEditMode,
    deleteSelectedMessages,
    deselectMessage,
    getDialogs,
    getMessages,
    selectMessage,
    sendMessage,
    setDialog
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages.items,
        ownerId: state.auth.userId,
        editMode: state.dialogsPage.editMode,
        isLoadingDialogs: state.dialogsPage.isLoadingDialogs,
        isLoadingMessages: state.dialogsPage.isLoadingMessages,
        newMessagesCount: state.dialogsPage.newMessagesCount,
        ownerPhoto: state.dialogsPage.ownerPhoto,
        companionPhoto: state.dialogsPage.companionPhoto
    };
};

export default compose(
    connect(mapStateToProps, {
        sendMessage,
        getDialogs,
        getMessages,
        setDialog,
        selectMessage,
        deselectMessage,
        checkEditMode,
        cancelSelectMessages,
        deleteSelectedMessages
    }),
    withRouter,
    withAuthRedirect
)(Dialogs);
