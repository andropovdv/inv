import React from 'react'
import s from './Cpus.module.css'

const CpuItem = (props) => {

    const selectCpu = () => {
        let currentCpu = {
            id_cpu: props.id_cpu,
            vendor: props.vendor,
            // id_vendor: props.id_vendor,
            model: props.model
        }
        props.setCurrentCpu(currentCpu)
    }

    return (
        <tr onClick={selectCpu}
            className={props.currentCpu.id_cpu === props.id_cpu ? s.selectedCpu : undefined}>
            <td>{props.vendor}</td>
            <td>{props.model}</td>
            <td><button onClick={() => { props.openModal() }}
                disabled={props.currentCpu.id_cpu === props.id_cpu ? false : true}>
                Редактировать
                </button></td>
            <td><button onClick={() => { props.deleteCpu(props.currentCpu.id_cpu) }}
                disabled={props.currentCpu.id_cpu === props.id_cpu ? false : true}>
                Удалить
                </button></td>
        </tr>
    )
}

export default CpuItem;