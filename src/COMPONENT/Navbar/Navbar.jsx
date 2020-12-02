import React from 'react';
import s from './Navbar.module.css'
import Tree from './Tree/Tree';

const navData = [
    {
        key: '0',
        label: 'Справочники',
        to: "",
        children: [
            {
                key: '0-0',
                label: 'Типы разъемов',
                to: "",
                children: []
            },
            {
                key: '0-1',
                to: '/Vendors',
                label: 'Производители',
            },
            {
                key: '0-1',
                to: '/Cpus',
                label: 'Процессоры',
            },
            {
                key: '0-2',
                to: '/MBoards',
                label: 'Материнские платы',
            }
        ]
    },
    {
        key: '1',
        label: 'Операции',
        to: "",
        children: [
            {
                key: '1-1',
                to: '/Rams',
                label: 'Поступление'
            }
        ]
    }
];

const Navbar = () => {
    return (
        <div className={s.appWrapperNavbar}>
            <div className={s.contentCenter}>
                <Tree data={navData} />
            </div>
        </div>
    )
}

export default Navbar;