import s from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import React, {ReactNode} from 'react';
import {MyPostsContainer} from './My Posts/MyPostsContainer';
import {Helmet} from 'react-helmet';
import {UserProfilePage} from '../../redux/profileReduser';

type ProfilePropsType = {
    children?: ReactNode
    profile: UserProfilePage | null
    status: string
    changeStatusAC: (newStatus: string) => void
    updateStatus: (status: string) => void
}

export function Profile(props: ProfilePropsType) {
    document.title = 'Profile'

    return (
        <div>
            <Helmet>
                <title>Profile</title>
                <meta name="description" content="Profile application"/>
            </Helmet>
            <ProfileInfo profile={props.profile} status={props.status} changeStatusAC={props.changeStatusAC}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}


