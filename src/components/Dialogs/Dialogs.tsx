import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {Helmet} from 'react-helmet';
import { DialogPageType } from '../../redux/redux-store';
import {AddMessageFormReduxForm, AddMessageFormType} from './AddMessageForm.';


type DialogsPropsType = {
    dialogsPage: DialogPageType
    sendMessage: (newMessage: string) => void
}

export function Dialogs(props: DialogsPropsType) {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>)

    const onSubmit = (formData: AddMessageFormType) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <Helmet>
                <title>Dialogs</title>
                <meta name="description" content="Dialogs application" />
            </Helmet>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

