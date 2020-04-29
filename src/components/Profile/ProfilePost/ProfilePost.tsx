import React, {FC} from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
import s from "./profilePost.module.scss";
import userAvatar from "./../../../assets/img/user.jpg";

type PropsType = {
    postId: number
    name: string
    date: string
    message: string
    likes: number
    deletePost: (userId: number) => void
}

const ProfilePost: FC<PropsType> = props => {
    return (
        <div className={s.content}>
            <div className={s.contentArea}>
                <div className={s.post_wrap}>
                    <div className={s.post_head}>
                        <div className={s.postInfo}>
                            <a href="#" className={s.post_avatar}>
                                <img src={userAvatar} alt=""/>
                            </a>
                            <div className={s.post_owner}>
                                <a href="#">{props.name}</a>
                                <span className={s.post_date}>{props.date}</span>
                            </div>
                        </div>
                        <div className={s.delPost}>
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    props.deletePost(props.postId);
                                }}
                            >
                                <MaterialIcon icon="delete" size={22}/>
                            </a>
                        </div>
                    </div>
                    <div className={s.post_body}>
                        <p>{props.message}</p>
                    </div>
                    <div className={s.post_footer}>
                        <a href="#" className={s.like}>
                            <MaterialIcon icon="star_border" size={22}/>
                            <p>{props.likes}</p>
                        </a>
                        <a href="#" className={s.repost}>
                            <MaterialIcon icon="reply" size={22}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePost;
