import React, {ChangeEvent} from 'react'
import s from './MyPosts.module.css'
import {Post} from './Post/Post';
import {PostType} from '../../../redux/redux-store';
import {MyPostsFormRedux, MyPostsFormType} from './MyPostsForm.';


type MyPostsType = {
    addPostActionCreator: (newPostBody: string) => void
    posts: Array<PostType>
}

export function MyPosts(props: MyPostsType) {
    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} id={p.id}/>)

    const onSubmit = (formData: MyPostsFormType) => {
        props.addPostActionCreator(formData.newPostBody)
    }

    return (
        <div className={s.posts_block}>
            <h3>My posts</h3>
            <MyPostsFormRedux onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}


