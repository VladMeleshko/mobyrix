import React from 'react';
import logo from '../../img/Icon.png';
import style from './Header.module.css';

export const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img className={style.logoImg} src={logo} alt="logo" />
                <p className={style.logoText}><span>PLNT:</span> Plant & Tree Idenifier </p>
            </div>
        </header>
    )
}
