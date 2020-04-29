import React, {FC} from "react";
import ProfilePostFormContainer from "./ProfilePostForm/ProfilePostFormContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "./profile.module.scss";
import ProfilePostsContainer from "./ProfilePostsContainer";
import {ProfileInfoProps} from "../../types/types";

type OwnerProps = {
    isOwner: boolean
}
type Props = ProfileInfoProps & OwnerProps
const Profile: FC<Props> = props => {
    return (
        <div className={s.content}>
            <ProfileInfo {...props} />
            <ProfilePostFormContainer/>
            <ProfilePostsContainer/>
        </div>
    );
};

export default Profile;
