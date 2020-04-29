import React from "react";
import {connect} from "react-redux";
import {logoutMe} from "../../redux/authReducer";
import Header from "./Header";
import {Redirect} from "react-router-dom";

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authFalse: false
        };
    }

    componentDidMount() {
        this.setState({
            authFalse: !this.props.isLogged
        });
    }

    logout = e => {
        e.preventDefault();
        this.props.logoutMe();
    };

    render() {
        return (
            <div>
                {!this.props.isLogged ? <Redirect push to="/login"/> : ""}
                <Header {...this.props} logout={this.logout}/>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    };
};

export default connect(mapStateToProps, {logoutMe})(HeaderContainer);
