import React from "react";
import s from "./profileInfo.module.scss";

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    statusText: this.props.profile.aboutMe
  }

  activateEditMode() {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode() {
    this.setState({
      editMode: false
    })
  }

  newStatusText(e) {
    this.setState({
      statusText: e.target.value
    })
  }

  render() {

    return (
    <div className={s.statusWrap}>
      {!this.state.editMode &&
        <small onClick={this.activateEditMode.bind(this)}>{this.state.statusText }</small>
      }
      {this.state.editMode &&
          <div className={s.statusEditWrap}>
          <input type="text" value={this.state.statusText} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} onChange={this.newStatusText.bind(this)}  />
        </div>
      }
    </div>
    )
  }
}

export default ProfileStatus;