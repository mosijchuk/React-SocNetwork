import React, { useState } from "react";
import { Input } from "../../common/Form/FormItems";
import s from "./profileInfo.module.scss";
import { Field, reduxForm } from "redux-form";

const ProfileData = props => {
  let [editMode, setEditMode] = useState(false);

  const handleSubmit = formData => {
    // setEditMode(false);
    props.updateProfileData(formData);
  };

  return (
    <div className={s.profileInfo_wrap__items}>
      {editMode ? (
        <ProfileDataEditReduxForm
          initialValues={props.profile}
          {...props}
          onSubmit={handleSubmit}
        />
      ) : (
        <ProfileDataStatic
          toEditMode={e => {
            e.preventDefault();
            setEditMode(true);
          }}
          {...props}
        />
      )}
    </div>
  );
};

const ProfileDataStatic = props => {
  return (
    <>
      <div className={s.profileInfo_wrap__itemsList}>
        {props.profile.aboutMe && (
          <div className={s.item}>
            <span>About me</span>
            <small>{props.profile.aboutMe}</small>
          </div>
        )}

        <div className={s.item}>
          <span>Looking for a job?</span>
          <small>{props.profile.lookingForAJob ? "Yes!" : "No"}</small>
        </div>

        {props.profile.lookingForAJob && (
          <div className={s.item}>
            <span>My skills</span>
            <small>
              {props.profile.lookingForAJobDescription &&
                props.profile.lookingForAJobDescription}
            </small>
          </div>
        )}

        {props.profile.contacts.facebook ? (
          <div className={s.item}>
            <span>Facebook</span>
            <a href={props.profile.contacts.facebook}>
              {props.profile.contacts.facebook}
            </a>
          </div>
        ) : (
          ""
        )}

        {props.profile.contacts.website ? (
          <div className={s.item}>
            <span>Website</span>
            <a href={props.profile.contacts.website} target="_blank">
              {props.profile.contacts.website}
            </a>
          </div>
        ) : (
          ""
        )}

        {props.profile.contacts.vk ? (
          <div className={s.item}>
            <span>VK</span>
            <a href={props.profile.contacts.vk} target="_blank">
              {props.profile.contacts.vk}
            </a>
          </div>
        ) : (
          ""
        )}

        {props.profile.contacts.twitter ? (
          <div className={s.item}>
            <span>Twitter</span>
            <a href={props.profile.contacts.twitter} target="_blank">
              {props.profile.contacts.twitter}
            </a>
          </div>
        ) : (
          ""
        )}

        {props.profile.contacts.instagram ? (
          <div className={s.item}>
            <span>Instagram</span>
            <a href={props.profile.contacts.instagram} target="_blank">
              {props.profile.contacts.instagram}{" "}
            </a>
          </div>
        ) : (
          ""
        )}

        {props.profile.contacts.youtube && (
          <div className={s.item}>
            <span>Youtube</span>
            <a href={props.profile.contacts.youtube} target="_blank">
              {props.profile.contacts.youtube}
            </a>
          </div>
        )}

        {props.profile.contacts.github && (
          <div className={s.item}>
            <span>Github</span>
            <a href={props.profile.contacts.github} target="_blank">
              {props.profile.contacts.github}
            </a>
          </div>
        )}

        {props.profile.contacts.mainLink && (
          <div className={s.item}>
            <span>MainLink</span>
            <a href={props.profile.contacts.mainLink} target="_blank">
              {props.profile.contacts.mainLink}{" "}
            </a>
          </div>
        )}
      </div>

      {props.isOwner && (
        <div className={s.profileInfo_wrap__itemsEdit}>
          <a href="#" onClick={props.toEditMode}>
            Edit
          </a>
        </div>
      )}
    </>
  );
};

const ProfileDataEditForm = ({ handleSubmit, ...props }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.item}>
        <span>About me</span>
        <Field
          component={Input}
          name={"aboutMe"}
          type={"text"}
          placeholder={"About me..."}
        />
      </div>

      <div className={s.item}>
        <span>Facebook</span>
        <Field
          component={Input}
          name={"contacts.facebook"}
          type={"text"}
          placeholder={"Facebook..."}
        />
      </div>

      <div className={s.item}>
        <span>Website</span>
        <Field
          component={Input}
          name={"contacts.website"}
          type={"text"}
          placeholder={"Website..."}
        />
      </div>

      <div className={s.item}>
        <span>VK</span>
        <Field
          component={Input}
          name={"contacts.vk"}
          type={"text"}
          placeholder={"VK..."}
        />
      </div>

      <div className={s.item}>
        <span>Twitter</span>
        <Field
          component={Input}
          name={"contacts.twitter"}
          type={"text"}
          placeholder={"Twitter..."}
        />
      </div>

      <div className={s.item}>
        <span>Instagram</span>
        <Field
          component={Input}
          name={"contacts.instagram"}
          type={"text"}
          placeholder={"Instagram..."}
        />
      </div>

      <div className={s.item}>
        <span>Youtube</span>
        <Field
          component={Input}
          name={"contacts.youtube"}
          type={"text"}
          placeholder={"Youtube..."}
        />
      </div>

      <div className={s.item}>
        <span>Github</span>
        <Field
          component={Input}
          name={"contacts.github"}
          type={"text"}
          placeholder={"Github..."}
        />
      </div>

      <div className={s.item}>
        <span>MainLink</span>
        <Field
          component={Input}
          name={"contacts.mainLink"}
          type={"text"}
          placeholder={"MainLink..."}
        />
      </div>

      <div className={s.item}>
        <span>Do you lokking for a job?</span>
        <Field component={Input} name={"lookingForAJob"} type={"checkbox"} />
      </div>

      <div className={s.item}>
        <span>Your skills</span>
        <Field
          component={Input}
          name={"lookingForAJobDescription"}
          type={"text"}
          placeholder={"Your skills..."}
        />
      </div>

      <div className={s.item}>
        <span>Name</span>
        <Field
          component={Input}
          name={"fullName"}
          type={"text"}
          placeholder={"Your name..."}
        />
      </div>
      {props.error && (
        <div className={s.errorSubmit}>
          <small>{props.error}</small>
        </div>
      )}
      <button className={s.btn_b}>Save</button>
    </form>
  );
};

let ProfileDataEditReduxForm = reduxForm({
  form: "profileEdit"
})(ProfileDataEditForm);

export default ProfileData;
