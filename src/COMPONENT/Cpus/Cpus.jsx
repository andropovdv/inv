import React from 'react'
import s from './Cpus.module.css'
import { connect } from 'react-redux';
import {
    getCpusData, setCurrentCpu,
    updateCpusData, deleteCpusData,
    addCpusData, setError
} from '../../BLL/cpuReducer';
import CpuItem from './CpuItem';
import AddEditTwo from '../Common/ModalWindows/AddEditTwo/AddEditTwo';
import CpuReduxForm from './CpuForm';

class Cpus extends React.Component {

    state = {
        isVisibleModal: false,
        headerModal: '',
        typeModal: false
    }

    componentDidMount() {
        this.props.getCpusData();
    }

    closeModal = () => {
        this.setState({ isVisibleModal: false })
        this.props.setError(0);
    }

    openModalNew = () => {
        this.props.setCurrentCpu(null, null, null)
        this.setState({ typeModal: false });
        this.setState({ headerModal: 'Добавляем' })
        this.setState({ isVisibleModal: true })

    }
    openModalEdit = () => {
        this.setState({ typeModal: true })
        this.setState({ headerModal: 'Редактируем:' })
        this.setState({ isVisibleModal: true })
    }
    addCpu = (values) => {
        let cpu = {
            vendor: values.vendor,
            model: values.model,
        }
        this.props.addCpusData(cpu)
        this.setState({ isVisibleModal: false })
    }
    updateCpu = (values) => {
        let updateCpu = {
            id_cpu: this.props.currentCpu.id_cpu,
            vendor: values.vendor,
            model: values.model
        }
        this.props.updateCpusData(updateCpu);
        this.setState({ isVisibleModal: false });
    }
    deleteCpu = (id_cpu) => {
        let result =
            window.confirm(`Вы действительно хотите удалить 
            ${this.props.currentCpu.vendor} ${this.props.currentCpu.model}`);
        let cpu = {
            id_cpu: id_cpu
        }
        if (result) {
            this.props.deleteCpusData(cpu);
        }
    }
    prevPage = () => {
        this.props.getCpusData(this.props.pagination.current - 1)
    }
    nextPage = () => {
        this.props.getCpusData(this.props.pagination.current + 1)
    }



    render() {
        let errorMesage;
        if (parseInt(this.props.errorCode, 10) === 10) {
            // errorMesage = <div className={s.errorMesage}>already have</div>
            errorMesage = <AddEditTwo onClose={this.closeModal}
                isOpen={true}
                header={'Информация:'}>
                <div className={s.errorMessage}>already have</div>
            </AddEditTwo>

        }
        debugger
        return (
            <div className={s.cpuWrapper}>
                <div className={s.cpuLabel}>
                    Процессоры:
                </div>
                <div className={s.cpuContent}>
                    <div className={s.buttonArea}>
                        <button onClick={this.openModalNew}>Добавить процессор</button>
                        <button onClick={this.prevPage}
                            disabled={typeof this.props.pagination.prev !== 'undefined' ? false : true}>
                            Предыдущая</button>
                        {this.props.pagination.current + 1}из{this.props.pagination.numPages}
                        <button onClick={this.nextPage}
                            disabled={typeof this.props.pagination.next !== 'undefined' ? false : true}>
                            Следующая</button>
                    </div>
                    <div>
                        {errorMesage}
                    </div>
                    <div disabled={this.props.isLoading}>
                        <table className={s.table2}>
                            <tbody>
                                <tr><th>Vendor</th><th>Model</th><th></th><th></th></tr>
                                {this.props.cpus.map(c =>
                                    <CpuItem
                                        key={c.id_cpu}
                                        {...this.props}
                                        id_cpu={c.id_cpu}
                                        id_vendor={c.id_vendor}
                                        vendor={c.name}
                                        model={c.model}
                                        openModal={this.openModalEdit}
                                        deleteCpu={this.deleteCpu} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <AddEditTwo onClose={this.closeModal}
                        isOpen={this.state.isVisibleModal}
                        header={this.state.headerModal}>
                        <div>
                            <CpuReduxForm
                                onSubmit={this.state.typeModal ? this.updateCpu : this.addCpu}
                                typeModal={this.state.typeModal}
                                {...this.props} />
                        </div>
                    </AddEditTwo>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    cpus: state.cpu.cpus,
    pagination: state.cpu.pagination,
    currentCpu: state.cpu.currentCpu,
    isLoading: state.cpu.isLoading,
    errorCode: state.cpu.errorCode
})

export default connect(mapStateToProps, {
    getCpusData, setCurrentCpu,
    updateCpusData, deleteCpusData, addCpusData, setError
})(Cpus)