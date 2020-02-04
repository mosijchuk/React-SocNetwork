import React from "react";
import s from "./Preloader.module.scss";

const Preloader = props => {
  return (
    <div
      className={`
      ${s.preloader} ${props.center && s.center} 
      ${props.inner && s.inner}
      ${props.noBg && s.noBg}      
      `}
    >
      <span />
    </div>
  );
};

export default Preloader;
