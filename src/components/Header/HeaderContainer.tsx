import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {authThunkCreator, logoutThunkCreator, SetAuthUserDataAC} from '../../redux/authReduser';
import {loginAPI} from '../../api/api';

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

class HeaderAPIContainer extends React.Component<any, any> {
    componentDidMount() {
        this.props.authThunkCreator(this.props.isAuth)
    }

    render() {
        return <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logoutThunkCreator}/>
    }

}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export const HeaderContainer = connect(mapStateToProps, {
    SetAuthUserDataAC, authThunkCreator, logoutThunkCreator
})(HeaderAPIContainer)

