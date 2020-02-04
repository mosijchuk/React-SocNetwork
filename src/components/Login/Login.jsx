import React from "react";
import s from "./Login.module.scss";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/Form/FormItems";
import { required } from "../common/Form/validators";

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && (
        <div className={s.errorSubmit}>
          <small>{props.error}</small>
        </div>
      )}
      <Field
        component={Input}
        name={"email"}
        type={"email"}
        placeholder={"Your email..."}
        validate={required}
      />
      <Field
        component={Input}
        name={"password"}
        type={"password"}
        placeholder={"Your password..."}
        validate={required}
      />
      <div className={s.form_group}>
        <Field component={"input"} name={"rememberMe"} type={"checkbox"} />{" "}
        <small>remember me</small>
      </div>

      {props.captchaUrl && (
        <>
          <img src={props.captchaUrl} alt="captcha" className={s.captchaUrl} />
          <Field
            component={Input}
            name={"captcha"}
            type={"text"}
            placeholder={"Captcha symbols..."}
            autoComplete={"off"}
            validate={required}
          />
        </>
      )}
      <button className={s.btn_b}>Login</button>
    </form>
  );
};

let LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const Login = props => {
  let onSubmit = formData => {
    props.loginMe(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  return (
    <div className={s.loginWrap}>
      <div className={s.sectionHeader}>
        <h2>Login</h2>
      </div>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

export default Login;
