import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormsControls/FormsControl';
import {maxLengthCreator, requiredField} from '../../utils/validators/validators';

export type AddMessageFormType = {
    newMessageBody: string
}

const maxLength100 = maxLengthCreator(100)

export const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} name={'newMessageBody'} component={Textarea}
                       validate={[requiredField, maxLength100]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormReduxForm = reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)