import React from 'react';
import s from './TypeOfGraphSlot.module.css'


const TypeOfGraphSlotItem = (props) => {

    const setCurrent = () => {
        let current = {
            idTypeOfGraphSlot: props.id,
            typeOfGraphSlot: props.typeOfGraph
        };
        props.setCurrentTypeOfGraph(current)
    }

    return (
        <tr onClick={setCurrent}
            className={props.currentType.idTypeOfGraphSlot === props.id
                ? s.selectedType
                : undefined} >
            <td>{props.typeOfGraph}</td>
            <td className={s.but}>
                <button onClick={() => props.clickEdit()}
                disabled={props.currentType.idTypeOfGraphSlot === props.id ? false : true}
                >Редактировать</button>
                <button onClick={() => props.delete()}
                disabled={props.currentType.idTypeOfGraphSlot === props.id ? false : true}
                >Удалить</button>
            </td>
        </tr>
    )
}

export default TypeOfGraphSlotItem;