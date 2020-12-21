import React from 'react'
import s from './CpuSocketType.module.css'


const CpuSoketItem = (props) => {

    const selectSocketCpu = () => {
        let currentType = {
            id_typeSocketCpu: props.id,
            name_typeSocketCpu: props.name
        }
        props.setCurrentSocketCpu(currentType)
    }

    return (
        <tr onClick={selectSocketCpu}
            className={props.currentType.id_typeSocketCpu === props.id ? s.selectedType : undefined}>
            <td>{props.name}</td>
            <td><button onClick={() => { props.openModalEdit() }}
                disabled={props.currentType.id_typeSocketCpu === props.id ? false : true}>
                Редактировать
                </button></td>
            <td><button onClick={() => { props.deleteTypeSocket() }}
                disabled={props.currentType.id_typeSocketCpu === props.id ? false : true}>
                Удалить
                </button></td>
        </tr>
    )
}

export default CpuSoketItem;
