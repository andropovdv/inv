import React from 'react';
import s from './Header.module.css';
import UserStatus from '../UserStatus/UserStatus';

const Header = (props) => {
    return (
        <div className={s.appWrapperHeader}>
            <div className={s.contentCenter}>Inventor</div>
            <div><UserStatus /></div>
        </div>
    )
}

export default Header;