import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {actions, follow, getUsers, unfollow} from "../../redux/usersReducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentUsersPage,
    getUsersAll,
    getUsersCount,
    getUsersIsFetching,
    getUsersIsFollowing,
    getUsersPagesCount,
    getUsersPerPage
} from "./users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

const {setCurrentPage, setTotalCount, setUsers} = actions

type MapStatePropsType = {
    users: Array<UserType>
    usersCount: number
    perPage: number
    usersPages: number
    currentPage: number
    isFetching: boolean
    isFollowing: boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (page_number: number) => void
    setTotalCount: (count: number) => void
    getUsers: (perPage: number, page: number) => void
}
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.getUsers(this.props.perPage, 1);
        }
    }

    onPageChange = (page: number) => {
        this.props.getUsers(this.props.perPage, page);
    };

    render() {
        return (
            <>
                {this.props.isFollowing && <Preloader/>}
                <Users
                    users={this.props.users}
                    usersCount={this.props.usersCount}
                    currentPage={this.props.currentPage}
                    usersPages={this.props.usersPages}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChange={this.onPageChange}
                    isFetching={this.props.isFetching}
                    isFollowing={this.props.isFollowing}
                />
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersAll(state),
        usersCount: getUsersCount(state),
        perPage: getUsersPerPage(state),
        usersPages: getUsersPagesCount(state),
        currentPage: getCurrentUsersPage(state),
        isFetching: getUsersIsFetching(state),
        isFollowing: getUsersIsFollowing(state)
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalCount,
        getUsers
    }),
    withAuthRedirect
)(UsersContainer);
