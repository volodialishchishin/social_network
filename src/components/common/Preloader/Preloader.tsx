import loader from '../../../assets/loader.gif';
import React from 'react';
import style from './Preloader.module.css'

export function Preloader() {
    return (
        <div className={style.preloader}>
            <img src={loader} style={{backgroundColor: 'white'}}/>
        </div>
    )
}