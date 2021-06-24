import s from './ProfileInfo.module.css'
import {UserProfilePage} from '../../../redux/profileReduser';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';

type ProfileInfoPropsType = {
    profile: UserProfilePage | null
    status: string
    changeStatusAC: (newStatus: string) => void
    updateStatus: (status: string) => void
}

export function ProfileInfo(props: ProfileInfoPropsType) {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.image_block}>
                <img
                    src="https://www.yashcreations.com/wp-content/uploads/2016/08/web-development-Banner.jpg"
                    alt=""/>
            </div>
            <div className={s.description_block}>
                <img src={props.profile.photos.large}/>
                <div>
                    <h1>{props.profile.fullName}</h1>
                    <p>{props.profile.aboutMe}</p>
                    <p>{props.profile.lookingForAJob ? 'Шукаю роботу ' : 'Не шукаю роботу '}<span>({props.profile.lookingForAJobDescription})</span></p>
                    <div>Contacts:</div>
                    <div>
                        <p>{props.profile.contacts.facebook}</p>
                        <p>{props.profile.contacts.vk}</p>
                        <p>{props.profile.contacts.github}</p>
                        <p>{props.profile.contacts.instagram}</p>
                        <p>{props.profile.contacts.twitter}</p>
                        <p>{props.profile.contacts.mainLink}</p>
                        <p>{props.profile.contacts.website}</p>
                        <p>{props.profile.contacts.youtube}</p>
                    </div>
                </div>
            </div>
            <ProfileStatus status={props.status} changeStatusAC={props.changeStatusAC} updateStatus={props.updateStatus}/>
        </div>
    )
}


