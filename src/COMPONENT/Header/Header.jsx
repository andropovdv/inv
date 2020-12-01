import React from 'react';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <div className={s.appWrapperHeader}>
            <div className={s.contentCenter}>Inventor</div>
        </div>
    )
}

export default Header;