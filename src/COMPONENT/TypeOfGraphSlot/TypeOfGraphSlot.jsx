import React, { useState } from 'react';
import ModalTypeOfGraphSlotContainet from '../Common/ModalWindows/ModalTypeOfGraphSlot/ModalTypeOfGraphSlotContainet';
import s from './TypeOfGraphSlot.module.css'
import TypeOfGraphSlotItem from './TypeOfGraphSlotItem';

const TypeOfGraphSlot = (props) => {

    let [typeSubmit, setTypeSubmit] = useState(false);
    let [header, setHeader] = useState('Добавляем:')

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

    return (
        <div className={s.typeGraphWrapper}>
            <div className={s.typeGraphLabel}>
                Тип графического разъема:
            </div>
            <div className={s.typeGraphContent}>
                <div className={s.buttonArea}>
                    <button onClick={clickAdd}>Добавить</button>
                    <button onClick={() => props.prevPage()}
                        disabled={typeof props.pagination.prev !== 'undefined' ? false : true}>
                        Предыдущая</button>
                    {props.pagination.current + 1}из{props.pagination.numPages}
                    <button onClick={() => props.nextPage()}
                        disabled={typeof props.pagination.next !== 'undefined' ? false : true}>
                        Следующая</button>
                </div>
                <div disabled={props.isLoading}>
                    <table className={s.table2}>
                        <tbody>
                            <tr>
                                <th>Наименование</th><th>Действия</th>
                            </tr>
                            {props.typeOfGraphSlot.map(tg => <TypeOfGraphSlotItem
                                {...props}
                                key={tg.typeOfGraphSlot}
                                id={tg.idTypeOfGraphSlot}
                                typeOfGraph={tg.typeOfGraphSlot}
                                clickEdit={clickEdit} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Разное */}
            <div>
                {props.typeOfGraphSlotVisibility
                    ? <ModalTypeOfGraphSlotContainet type={typeSubmit} header={header} />
                    : null}
            </div>
        </div>
    )
}

export default TypeOfGraphSlot;
