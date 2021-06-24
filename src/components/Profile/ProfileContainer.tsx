import React from 'react';
import {Helmet} from 'react-helmet';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    changeStatusAC, createPhotoThunkCreator,
    getMeProfileThunkCreator,
    getMeStatusThunkCreator,
    setUserProfile, updateStatusThunkCreator,
    UserProfilePage
} from '../../redux/profileReduser';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router'
import {withAuthRedirect} from '../../hoc/AuthRedirect';
import {compose} from 'redux';

type PathParamsType = {
    userId: string | undefined
}
type MapStateToPropsType = {
    profile: UserProfilePage | null
    status: string
    autorizedUserID: any
    isAuth: boolean
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: UserProfilePage) => void
    changeStatusAC: (newStatus: string) => void
    getMeStatusThunkCreator: (userId: number) => void
    updateStatusThunkCreator: (status: string) => void
    createPhotoThunkCreator: any
}
type thunkPropsType = {
    getMeProfileThunkCreator: (userId: number) => void
}
type ProfileAPIContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & thunkPropsType


type PropsType = RouteComponentProps<PathParamsType> & ProfileAPIContainerPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.autorizedUserID
        }
        this.props.getMeProfileThunkCreator(userId)
        this.props.getMeStatusThunkCreator(userId)
        this.props.createPhotoThunkCreator()
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Profile</title>
                    <meta name="description" content="Profile application"/>
                </Helmet>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         changeStatusAC={this.props.changeStatusAC} updateStatus={this.props.updateStatusThunkCreator}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserID: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUserProfile, getMeProfileThunkCreator, changeStatusAC,
        getMeStatusThunkCreator, updateStatusThunkCreator,createPhotoThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


