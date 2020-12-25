import React, { useState } from 'react';
import s from './TypeOfRam.module.css'
import TypeOfRamItem from './TypeOfRamItem';
import ModalTypeOfRamContainer from '../Common/ModalWindows/ModalTypeOfRam/ModalTypeOfRamContainer';

const TypeOfRam = (props) => {

    let [typeSubmit, setTypeSubmit] = useState(false);
    let [header, setHeader] = useState('Добавляем:');

    const clickAdd = () => {
        setTypeSubmit(false);
        setHeader('Добавляем:');
        props.createModal(true);
    }

    const clickEdit = () => {
        setTypeSubmit(true);
        setHeader('Редактируем:');
        props.createModal(false);
    }

    let errorMessage;
    if (parseInt(props.errorCode, 10) === 10) {
        props.setErrorCode(0)
        errorMessage = alert('Уже есть !')
    }

    return (
        <div className={s.typeRamWrapper}>
            <div className={s.typeRamLabel}>
                Тип оперативной памяти
            </div>
            <div className={s.typeRamContent}>
                <div className={s.buttonArea}>
                    <button onClick={clickAdd}>Добавить</button>
                    <button disabled={typeof props.pagination.prev !== 'undefined' ? false : true}
                    >Предыдущая</button>
                    {props.pagination.current +1}из{props.pagination.numPages}
                    <button disabled={typeof props.pagination.next !== 'undefined' ? false : true}
                    >Следующая</button>
                </div>
                <div disabled={props.isLoading}>
                    <table className={s.table2}>
                        <tbody>
                            <tr>
                                <th>Наименование</th><th>Действия</th>
                            </tr>
                            {props.typeOfRam.map(tr => <TypeOfRamItem
                                {...props}
                                key={tr.id_typeRam}
                                clickEdit={clickEdit}
                                typeOfRam={tr.typeOfRam}
                                id={tr.id_typeRam} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {errorMessage}
                {props.typeOfRamVisibility
                    ? < ModalTypeOfRamContainer type={typeSubmit} header={header} />
                    : null}
            </div>
        </div>
    )
}

export default TypeOfRam;