import React from 'react'
import s from './Cpus.module.css'
import CpuItem from './CpuItem';
import AddEditTwo from '../Common/ModalWindows/AddEditTwo/AddEditTwo';
import CpuReduxForm from './CpuForm';
import ModalCpuSocketContainer from '../Common/ModalWindows/ModalCpuSocket/ModalCpuSocketContainer';
import ModalVendorContainer from '../Common/ModalWindows/ModalVendor/ModalVendorContainer';

const Cpus = (props) => {

    let errorMessage;
    if (parseInt(props.errorCode, 10) === 10) {
        errorMessage = <AddEditTwo onClose={props.closeModal}
            isOpen={true}
            header={'Информация:'}>
            <div className={s.errorMessage}>already have</div>
        </AddEditTwo>

    }
    return (
        <div className={s.cpuWrapper}>
            <div className={s.cpuLabel}>
                Процессоры:
                </div>
            <div className={s.cpuContent}>
                <div className={s.buttonArea}>
                    <button onClick={() => props.openModalNew()}>Добавить процессор</button>
                    <button onClick={() => props.prevPage()}
                        disabled={typeof props.pagination.prev !== 'undefined' ? false : true}>
                        Предыдущая</button>
                    {props.pagination.current + 1}из{props.pagination.numPages}
                    <button onClick={() => props.nextPage()}
                        disabled={typeof props.pagination.next !== 'undefined' ? false : true}>
                        Следующая</button>
                </div>
                <div>
                    {errorMessage}
                </div>
                <div disabled={props.isLoading}>
                    <table className={s.table2}>
                        <tbody>
                            <tr><th>Vendor</th><th>Model</th><th></th><th></th></tr>
                            {props.cpus.map(c =>
                                <CpuItem
                                    key={c.id_cpu}
                                    {...props}
                                    id_cpu={c.id_cpu}
                                    id_vendor={c.id_vendor}
                                    vendor={c.name}
                                    model={c.model}
                                    socketCpu={c.name_typeSocketCpu}
                                    openModal={props.openModalEdit}
                                    deleteCpu={props.deleteCpu} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={s.cpuInfo}>
                Подробная информация
                    <p><b>{props.currentCpu.name_typeSocketCpu}</b></p>
            </div>
            <div>
                <AddEditTwo onClose={props.closeModal}
                    isOpen={props.isVisable}
                    header={props.header}>
                    <CpuReduxForm
                        onSubmit={props.typeModal ? props.updateCpu : props.addCpu}
                        typeModal={props.typeModal}
                        {...props} />
                </AddEditTwo>

            </div>
            <div>
                {/* <ModalCpuContainer /> */}
                <div>
                    {props.cpuSocketVisibility
                        ? <ModalCpuSocketContainer />
                        : null}
                </div>
                <div>
                    {props.vendorVisibility
                        ? <ModalVendorContainer />
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Cpus;