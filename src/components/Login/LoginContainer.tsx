import React, {FC} from "react";
import Login from "./Login";
import s from "./Login.module.scss";
import {connect} from "react-redux";
import {loginMe} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type OwnPropsType = {}
type MapStatePropsType = {
    username: string | null
    isLogged: boolean
    loading: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    loginMe: (email: string,
              password: string,
              rememberMe: boolean,
              captcha: string | null) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LoginContainer: FC<PropsType> =
    props => {
        if (props.isLogged) {
            return <Redirect to="/profile"/>;
        }
        return (
            <div className={s.content}>
                <div className={s.contentArea}>
                    <Login {...props} />
                </div>
            </div>
        );
    }


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    username: state.auth.login,
    isLogged: state.auth.isLogged,
    loading: state.profilePage.loading,
    captchaUrl: state.auth.captchaUrl
});

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {loginMe})(LoginContainer);
