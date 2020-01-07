import React from "react";
import s from "./profileInfo.module.scss";
import { Field, reduxForm } from "redux-form";

let ProfileStatusForm = props => {
  return (
    <form
      onSubmit={props.handleSubmit}
      onBlur={props.handleSubmit}
      onKeyDown={event => {
        if (event.keyCode === 13) {
          event.preventDefault();
          props.handleSubmit();
        }
      }}
    >
      <Field
        component={"input"}
        name={"statusText"}
        autoFocus={true}
        type={"text"}
      />
    </form>
  );
};

let ProfileStatusReduxForm = reduxForm({ form: "ProfileStatusForm" })(
  ProfileStatusForm
);

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    statusText: this.props.profileStatus
  };

  activateEditMode = () => {
    if (this.props.selfPage) {
      this.setState({
        editMode: true
      });
    }
  };

  deactivateEditMode = values => {
    let statusText = values.statusText || "";
    this.props.updateProfileStatus(statusText);

    this.setState({
      editMode: false
    });
  };

  render() {
    return (
      <div className={s.statusWrap}>
        {!this.state.editMode && (
          <small onClick={this.activateEditMode}>
            {this.props.profileStatus ? this.props.profileStatus : "-"}
          </small>
        )}
        {this.state.editMode && (
          <div className={s.statusEditWrap}>
            <ProfileStatusReduxForm onSubmit={this.deactivateEditMode} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
