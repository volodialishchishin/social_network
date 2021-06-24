import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, requiredField} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControl';

export type MyPostsFormType = {
    newPostBody: string
}

const maxLength10 = maxLengthCreator(10)

export const MyPostsForm: React.FC<InjectedFormProps<MyPostsFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your post'} name={'newPostBody'} component={Textarea}
                       validate={[requiredField, maxLength10]}/>
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
}

export const MyPostsFormRedux = reduxForm<MyPostsFormType>({form: 'profileMyPostsForm'})(MyPostsForm)