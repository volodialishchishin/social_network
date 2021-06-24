import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../components/common/FormsControls/FormsControl';
import {requiredField} from '../utils/validators/validators';
import s from '../components/common/FormsControls/FormsControl.module.css'

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<any> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Login'} name={'login'} component={Input} validate={[requiredField]}/>
        </div>
        <div>
            <Field type={'password'} placeholder={'Password'} name={'password'} component={Input} validate={[requiredField]}/>
        </div>
        <div>
            <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
        </div>
        {props.error ? <div className={s.formSummaryError}>{props.error}</div> : ''}
        <div>
            <button>Login</button>
        </div>
    </form>
}

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)