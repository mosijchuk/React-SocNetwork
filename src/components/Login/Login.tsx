import React, {FC} from "react";
import s from "./Login.module.scss";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/Form/FormItems";
import {required} from "../common/Form/validators";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type LoginFieldDataType = {
    component: React.ReactNode
    name: keyof LoginFormData
    type: string
    placeholder?: string
    validate?: () => void
    autoComplete?: string
}
const LoginForm: FC<InjectedFormProps<LoginFormData, LoginFormOwnProps> & LoginFormOwnProps> = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            {props.error && (
                <div className={s.errorSubmit}>
                    <small>{props.error}</small>
                </div>
            )}
            <Field<LoginFieldDataType>
                component={Input}
                name={"email"}
                type={"email"}
                placeholder={"Your email..."}
                validate={required}
            />
            <Field<LoginFieldDataType>
                component={Input}
                name={"password"}
                type={"password"}
                placeholder={"Your password..."}
                validate={required}
            />
            <div className={s.form_group}>
                <Field<LoginFieldDataType> component={"input"} name={"rememberMe"} type={"checkbox"}/>{" "}
                <small>remember me</small>
            </div>

            {props.captchaUrl && (
                <>
                    <img src={props.captchaUrl} alt="captcha" className={s.captchaUrl}/>
                    <Field<LoginFieldDataType>
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

const LoginReduxForm = reduxForm<LoginFormData, LoginFormOwnProps>({
    form: "login"
})(LoginForm);

type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type LoginPropsType = {
    username: string | null
    isLogged: boolean
    loading: boolean
    captchaUrl: string | null
    loginMe: (
        email: string,
        password: string,
        rememberMe: boolean,
        captcha: string | null
    ) => void
}

const Login: FC<LoginPropsType> = props => {
    const onSubmit = (formData: LoginFormData) => {
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
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

export default Login;
