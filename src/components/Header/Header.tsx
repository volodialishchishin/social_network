import s from './Header.module.css'
import { NavLink } from 'react-router-dom';
import {ReactNode} from 'react';

type HeaderPropsType = {
    children?: ReactNode
    isAuth: boolean
    login: string | null
    logout: () => void
}

export function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <div className={s.image}>
                <img
                     src="https://art.pixilart.com/efa94fefad71c75.png"
                     alt=""/>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div className={s.logout}>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink className={s.login} to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

