import React from 'react'
import {ActionType} from './profileReduser';
import {usersAPI} from '../api/api';
import {futimes} from 'fs';

export type FollowAT = {
    type: 'FOLLOW'
    userId: number
}

export type UnfollowAT = {
    type: 'UNFOLLOW'
    userId: number
}

export type SetUsersAT = {
    type: 'SET_USERS'
    users: Array<UserType>
}

export type SetCurrentPageAT = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}

export type SetTotalCountAT = {
    type: 'SET_TOTAL_COUNT'
    totalCount: number
}

export type ToggleIsFetchingAT = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

export type ToggleIsFollowingProgressAT = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFollowing: boolean
    userID: number
}


export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

type usersLocation = {
    city: string
    country: string
}
export type UserType = {
    id: number,
    photos: PhotosType
    followed: boolean,
    name: string,
    status: string
}
type PhotosType = {
    small: string | null
    large: string | null
}
export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReduser = (state: UsersPageType = initialState, action: ActionType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFollowing
                    ?  [...state.followingInProgress,  action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)}
        default:
            return state;
    }
}

export const follow = (userId: number): FollowAT => ({type: FOLLOW, userId})

export const unfollow = (userId: number): UnfollowAT => ({type: UNFOLLOW, userId})

export const setUsers = (users: Array<UserType>): SetUsersAT => ({type: SET_USERS, users})

export const setCurrentPage = (currentPage: number): SetCurrentPageAT => ({type: SET_CURRENT_PAGE, currentPage})

export const setTotalCount = (totalCount: number): SetTotalCountAT => ({type: SET_TOTAL_COUNT, totalCount})

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAT => ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleIsFollowingProgress = (isFollowing: boolean, userID: number): ToggleIsFollowingProgressAT => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowing, userID})

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalCount(data.totalCount))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const unfollowUsersThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.unfollowUser(userId).then(data => {
            if (data.resultCode == 0) {
                dispatch(unfollow(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}

export const followUsersThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.followUser(userId).then(data => {
            if (data.resultCode == 0) {
                dispatch(follow(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}