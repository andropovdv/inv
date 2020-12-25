import React from 'react';
import s from './TypeOfRam.module.css'
import TypeOfRamItem from './TypeOfRamItem';

const TypeOfRam = (props) => {
    return (
        <div className={s.typeRamWrapper}>
            <div className={s.typeRamLabel}>
                Тип оперативной памяти
            </div>
            <div className={s.typeRamContent}>
                <div className={s.buttonArea}>
                    <button>Добавить</button>
                    <button>Предыдущая</button>
                    <button>Следующая</button>
                </div>
                <div disabled={props.isLoading}>
                    <table className={s.table2}>
                        <tbody>
                            <tr>
                                <th>Наименование</th><th></th><th></th>
                            </tr>
                            {props.typeOfRam.map(tr => <TypeOfRamItem
                            {...props}
                            typeOfRam={tr.typeOfRam}
                            id={tr.id_typeRam} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {/* {errorMessage} */}
            </div>
        </div>
    )
}

export default TypeOfRam;