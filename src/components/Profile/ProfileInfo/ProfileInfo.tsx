import React, {FC} from "react";

import s from "./profileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/img/user.jpg";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import profileAvatarFileInput from "../../common/Form/FormItems";
import ProfileData from "./ProfileData";
import {ProfileInfoProps} from "../../../types/types";


const UpdateAvatarForm: FC<InjectedFormProps> = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field type="file" name="image" component={profileAvatarFileInput}/>
        </form>
    );
};

const UpdateAvatarReduxForm = reduxForm({form: "avatarUpdate"})(
    UpdateAvatarForm
);


const ProfileInfo: FC<ProfileInfoProps> = props => {
    if (!props.profile || props.loading) {
        return <Preloader/>;
    }

    const updateAvatar = (imageData: any) => {
        const formData: any = new FormData()
        formData.append("image", imageData.image);

        for (var key of formData.entries()) {
        }
        if (props.myId)
            props.updateProfileAvatar(formData, props.myId);
    };

    const changeAvatarClick = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    return (
        <div className={s.contentArea}>
            <div className={s.profileInfo}>
                <div className={s.profileInfo_avatar}>
                    <div className={s.profileInfo_avatar_wrap}>
                        <img
                            src={
                                props.profile.photos.large
                                    ? props.profile.photos.large
                                    : userPhoto
                            }
                            alt=""
                        />
                        {props.isOwner && (
                            <div className={s.avatarActions}>
                                <UpdateAvatarReduxForm onChange={updateAvatar}/>
                            </div>
                        )}
                    </div>

                    {!props.isOwner && (
                        <div className={s.profileInfo_avatar_buttonsWrap}>
                            {props.isFollowed ? (
                                <a
                                    href="#"
                                    className={`${s.btn_b} ${s.selected}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        if (props.profile && props.profile.userId)
                                            props.unfollowProfile(props.profile.userId);

                                    }}
                                >
                                    Unfollow
                                </a>
                            ) : (
                                <a
                                    href="#"
                                    className={s.btn_b}
                                    onClick={e => {
                                        e.preventDefault();
                                        if (props.profile && props.profile.userId)
                                            props.followProfile(props.profile.userId);
                                    }}
                                >
                                    Follow {props.isOwner}
                                </a>
                            )}
                        </div>
                    )}
                </div>
                <div className={s.profileInfo_wrap}>
                    <h3>{props.profile.fullName}</h3>
                    <ProfileStatus {...props} />

                    <ProfileData {...props} />
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
