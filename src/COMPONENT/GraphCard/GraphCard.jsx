import React, { useState } from 'react';
import s from '../Common/Css/sp.module.css';
import ModalGraphCardContainer from '../Common/ModalWindows/ModalGraphCard/ModalGraphCardContainer';
import GraphCardItem from './GraphCardItem';

const GraphCard = (props) => {

    let [typeSubmit, setTypeSubmit] = useState(false);
    let [header, setHeader] = useState('');

    const clickAdd = () => {
        setTypeSubmit(false);
        setHeader('Добавляем:');
        props.createModal(true);
    }
    return (
        
        <div className={s.spWrapper}>
            <div className={s.spLabel}>
                Графические карты
            </div>
            <div className={s.spContent}>
                <div className={s.buttonArea}>
                    <button onClick={clickAdd}>Добавить</button>
                    <button>Предыдущая</button>
                    <button>Следующая</button>
                </div>
                <div disabled={props.isLoading}>
                    <table className={s.table2}>
                        <tbody>
                            <tr>
                                <th>Наименование</th><th>Действия</th>
                            </tr>
                            {props.graphCard.map(gc => <GraphCardItem
                                {...props}
                                key={gc.idGraph}
                                id={gc.idGraph}
                                vendor={gc.name}
                                model={gc.model}
                                slot={gc.typeOfGraphSlot}
                                volume={gc.volume} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={s.spInfo}>
                Подробная информация
                <hr></hr>
                {typeof props.currentRow.idGraph !== 'undefined'
                    ?
                    <div>
                        <div>Производитель: {props.currentRow.vendor}</div>
                        <div>Модель: {props.currentRow.model}</div>
                        <div>Разъем: {props.currentRow.slot}</div>
                        <div>Объем: {props.currentRow.volume} (Мб)</div>
                    </div>
                    : null
                }

            </div>
            {/* разное */}
            <div>
                {props.graphCardVisibility
                    ? <ModalGraphCardContainer type={typeSubmit} header={header} />
                    : null}
            </div>
        </div>
    )
}

export default GraphCard;