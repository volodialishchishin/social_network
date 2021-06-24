import React from 'react';
import {FormDataType, LoginReduxForm} from './LoginForm';
import {connect} from 'react-redux';
import {loginThunkCreator} from '../redux/authReduser';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../redux/redux-store';

type mapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean) => void
}

type LoginPropsType = mapStateToPropsType & MapDispatchToPropsType

const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginThunkCreator(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginThunkCreator})(Login)