import React from 'react'
import {ActionType} from './profileReduser';
import {DialogPageType} from './redux-store';

export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

export type NewMessageActionType = {
    type: 'ADD-NEW-MESSAGE'
    newMessageBody: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Lizok'},
        {id: 2, name: 'Oksik'},
        {id: 3, name: 'Dimon'},
        {id: 4, name: 'Denis'},
        {id: 5, name: 'Masha'}
    ],
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'What is your name?'}
    ]
}

export const dialogsReduser = (state: DialogPageType = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_NEW_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}]
            }
        }
        default:
            return state;
    }
}

export const addNewMessageActionCreator = (newMessageBody: string): NewMessageActionType => ({
    type: ADD_NEW_MESSAGE,
    newMessageBody: newMessageBody
})