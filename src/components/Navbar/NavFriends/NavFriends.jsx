import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./NavFriends.module.scss";
import NavFriendsItem from "./NavFriendsItem/NavFriendsItem";

const NavFriends = props => {
  let friends = props.state.map(friend => (
    <NavFriendsItem name={friend.name} avatar={friend.avatar} />
  ));

  return (
    <div className={s.NavFriendsBlock}>
      <header className={s.header}>
        <MaterialIcon icon="people" size={18} />
        <h4>Friends</h4>
      </header>
      <div className={s.FriendsWrap}>{friends}</div>
    </div>
  );
};

export default NavFriends;
