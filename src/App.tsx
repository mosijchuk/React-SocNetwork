import React, {FC, useEffect} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import "./components/scss/App.scss";
import s from "./components/scss/components.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {Redirect} from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/appReducer";
import {withSuspense} from "./hoc/withSuspense";
import NotFound404 from "./components/404/404";
import NavContainer from "./components/Navbar/NavContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() =>
    import("./components/Dialogs/DialogsContainer")
);

const UsersContainer = React.lazy(() =>
    // @ts-ignore
    import("./components/Users/UsersContainer")
);

type OwnProps = {}

type Props = MSTP & MDTP & OwnProps

const App: FC<Props> = (props) => {
    useEffect(() => {
        props.initializeApp();
    }, [])

    if (!props.initialized) {
        return <Preloader center={true}
        />
    }

    return (
        <div className="app_wrapper">
            <HeaderContainer/>
            <div className={s.container}>
                <div className={s.page_wrap}>
                    <NavContainer/>
                    <div className="content">
                        <Switch>
                            <Route
                                path="/profile/:userId?"
                                render={withSuspense(ProfileContainer)}
                            />
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/profile"/>}
                            />
                            <Route
                                path="/dialogs/:dialogId?"
                                render={withSuspense(DialogsContainer)}
                            />
                            <Route path="/users" render={withSuspense(UsersContainer)}/>
                            <Route exact path="/login" render={() => <LoginContainer/>}/>
                            <Route path="*" render={() => <NotFound404/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}


type MSTP = {
    initialized: boolean
}
type MDTP = {
    initializeApp: () => void
}
const mapStateToProps = (state: AppStateType): MSTP => {
    return {
        initialized: state.app.initialized,
    };
};

export default compose<any>(
    connect<MSTP, MDTP, OwnProps, AppStateType>(mapStateToProps, {initializeApp}),
    withRouter
)(App);
