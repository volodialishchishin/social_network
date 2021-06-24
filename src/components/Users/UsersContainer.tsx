import {connect, useDispatch} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow, followUsersThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unfollow, unfollowUsersThunkCreator,
    UserType
} from '../../redux/usersReduser';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';
import {withAuthRedirect} from '../../hoc/AuthRedirect';
import {compose} from 'redux';

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}


type UsersAPIComponentPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    isFetching: boolean
    followingInProgress: number[]
    toggleIsFollowingProgress: (isFollowing: boolean, userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    unfollowUsersThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}

type UsersStateType = {}

export class UsersComponent extends React.Component<UsersAPIComponentPropsType, UsersStateType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} pageSize={this.props.pageSize} follow={this.props.follow}
                   unfollow={this.props.unfollow} currentPage={this.props.currentPage}
                   totalUsersCount={this.props.totalUsersCount} onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   unfollowUsersThunkCreator={this.props.unfollowUsersThunkCreator}
                   followUsersThunkCreator={this.props.followUsersThunkCreator}/>
        </>
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, toggleIsFollowingProgress, getUsersThunkCreator, unfollowUsersThunkCreator,
        followUsersThunkCreator
    }),
    withAuthRedirect
)(UsersComponent)