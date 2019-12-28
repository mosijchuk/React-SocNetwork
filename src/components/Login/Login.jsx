import React from "react";
import s from "./Login.module.scss";

const Login = props => {
  return (
    <div className={s.loginWrap}>
      <div className={s.sectionHeader}>
        <h2>Login</h2>
      </div>
      <form action="#">
        <div className={s.form_group}>
          <input type="email" name="email" placeholder="Your email..." />
        </div>
        <div className={s.form_group}>
          <input
            type="password"
            name="password"
            placeholder="Your password..."
          />
        </div>
        <button type="submit" className={s.btn_b}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
