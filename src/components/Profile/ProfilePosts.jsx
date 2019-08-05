import React from "react";
import ProfilePost from "./ProfilePost/ProfilePost";

const ProfilePosts = props => {
  let posts = props.posts
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
        deletePost={props.deletePost}
      />
    ));

  return <div>{posts}</div>;
};

export default ProfilePosts;
