import s from './Post.module.css'

type PostPropsType = {
    message: string
    likesCount: number
    id: number
}

export function Post(props: PostPropsType) {
    return (

        <div className={s.item}>
            <img
                src='https://www.liveabout.com/thmb/pElYdfgKoydmsrso8fiU1wd-jO0=/1449x1449/smart/filters:no_upscale()/Avatar_12_HR_01-56a00ca93df78cafda9fd17c.jpg'/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>

    )
}


