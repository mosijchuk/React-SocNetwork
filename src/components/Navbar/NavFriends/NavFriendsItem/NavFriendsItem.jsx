import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./NavFriendsItem.module.scss";

const NavFriendsItem = props => {
  // let friends = props.state.map(() => );
  return (
    <div className={s.item}>
      <a href="#">
        <img src={props.avatar} alt="" />
        <p>{props.name}</p>
      </a>
    </div>
  );
};

export default NavFriendsItem;
