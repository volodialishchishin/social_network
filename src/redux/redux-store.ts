import {applyMiddleware, combineReducers, createStore} from 'redux';
import {profileReduser, UserProfilePage} from './profileReduser';
import {dialogsReduser} from './dialogsReduser';
import {usersReduser} from './usersReduser';
import {authReducer} from './authReduser';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReducer,
    form: formReducer
})

export type AppStateType = ReturnType<typeof reducers>

export let store = createStore(reducers, applyMiddleware(thunk))

// @ts-ignore
window.store = store

export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
}

export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type DialogType = {
    id: number
    name: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: UserProfilePage
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type MessageType = {
    id: number
    message: string
}

