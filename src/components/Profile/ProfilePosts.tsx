import React, {FC} from "react";
import ProfilePost from "./ProfilePost/ProfilePost";
import {PostType} from "../../types/types";

type PropsType = {
    posts: Array<PostType>
    deletePost: (postId: number) => void
}
const ProfilePosts: FC<PropsType> = ({posts, deletePost}) => {
    const postList = posts
        .slice(0)
        .reverse()
        .map(p => (
            <ProfilePost
                key={p.id}
                postId={p.id}
                name={p.name}
                date={p.date}
                message={p.message}
                likes={p.likes}
                deletePost={deletePost}
            />
        ));

    return <div>{postList}</div>;
};

export default ProfilePosts;
