import React from 'react'
import {addPostActionCreator} from '../../../redux/profileReduser';
import {MyPosts} from './MyPosts';
import {AppStateType, PostType} from '../../../redux/redux-store';
import {connect} from 'react-redux';


type mapStateToPropsType = {
    posts: Array<PostType>
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

export const MyPostsContainer = connect(mapStateToProps, {addPostActionCreator})(MyPosts);


