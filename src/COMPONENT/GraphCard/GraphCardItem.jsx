import React from 'react';
import s from '../Common/Css/sp.module.css';


const GraphCardItem = (props) => {

    const setCurrent = () => {
        let current = {
            idGraph: props.id,
            vendor: props.vendor,
            model: props.model,
            slot: props.slot,
            volume: props.volume
        }
        props.setCurrentGraphCard(current)
    }

    return (
        <tr onClick={setCurrent}
            className={props.currentRow.idGraph === props.id ? s.selectedRow : undefined}>
            <td>
                {props.vendor} {props.model}
            </td>
            <td className={s.but}>
                <button>Редактировать</button>
                <button>Удалить</button>
            </td>
        </tr>
    )
}

export default GraphCardItem;