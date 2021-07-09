import React from 'react';
import { NavLink } from "react-router-dom";
import style from './MainInfo.module.css';
import { Header } from '../header/Header';

export const MainInfo = () => {
    return (
        <main className={style.mainInfoPage}>
            <Header />
            <div className={style.mainInfo}>
                <h1 className={style.title}>We love helping you to safe the plants</h1>
                <p className={style.subTitle}>We help realize you dreams in making a garden, lets start with small things that can change the world, so you can enjoy the frsh air forever</p>
                <NavLink to='/questions/1'><button className={style.startButton}>Continue</button></NavLink>
            </div>
        </main>
    );
}
