import {unfollowUsersThunkCreator, UserType} from '../../redux/usersReduser';
import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.jpg'
import React from 'react';
import {Helmet} from 'react-helmet';
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../api/api';

type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[]
    toggleIsFollowingProgress: (isFollowing: boolean, userId: number) => void
    unfollowUsersThunkCreator: (userId: number) => void
    followUsersThunkCreator: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = ({
                                                    users,
                                                    pageSize,
                                                    totalUsersCount,
                                                    currentPage,
                                                    follow,
                                                    onPageChanged,
                                                    followingInProgress,
                                                    toggleIsFollowingProgress,
                                                    unfollowUsersThunkCreator,
                                                    followUsersThunkCreator
                                                }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let now = currentPage

    return (
        <div className={s.allUser}>
            <Helmet>
                <title>Users</title>
                <meta name="description" content="Users application"/>
            </Helmet>
            <div className={s.titleUsers}>Users</div>
            <div>
                {pages.map(p => {
                        if ((p < now + 5 && p > now - 5) ||
                            p === 1 || p === pages.length
                        ) {
                            return <span onClick={() => onPageChanged(p)}
                                         className={currentPage === p ? s.selectedPage : s.numberPage}>{p}</span>
                        }
                    }
                )}
            </div>
            {users.map((u: UserType) => {
                return <div className={s.user}>
                    <div className={s.image}>
                        <NavLink to={'/profile/' + u.id}>
                            <img
                                src={u.photos.small != null ? u.photos.small : userPhoto}
                                alt=""/>
                        </NavLink>
                        {
                            u.followed
                            ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                unfollowUsersThunkCreator(u.id)}}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                followUsersThunkCreator(u.id)}}>Follow</button>
                        }
                    </div>
                    <div className={s.main}>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                        <div className={s.location}>
                            <div> {'u.location.city'},</div>
                            <div>{'u.location.country'}</div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}