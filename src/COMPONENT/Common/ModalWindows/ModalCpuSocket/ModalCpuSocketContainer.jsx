import React from 'react';
import { connect } from 'react-redux';
// import s from './ModalCpu.module.css';
import { setError } from '../../../../BLL/cpuReducer';
import { setCpuSoketVisibility } from '../../../../BLL/modalWindowReducer';
import CpuSocketReduxForm from '../../../CpuSocketType/CpuSocketForm';
import { addSocketCpuData } from '../../../../BLL/typeSocketCpuReducer';
import Modal from '../Modal';

class ModalCpuSocketContainer extends React.Component {

    closeModal = () => {
        this.props.setCpuSoketVisibility(false)
    }

    addSocketCpu = (values) => {
        let typeSocket = { name_typeSocketCpu: values.name_typeSocketCpu }
        this.props.addSocketCpuData(typeSocket);
        this.props.setCpuSoketVisibility(false)
    }

    render() {
        // if (!this.props.cpuSocketVisibility) return null;
        return (
            <div>
                <Modal {...this.props} closeModal={this.closeModal} header={'Добавить разъем процессора'}>
                    <CpuSocketReduxForm onSubmit={this.addSocketCpu} />
                </Modal>
            </div>
        )

    }
}

let mapStateToProps = (state) => ({
    cpuSocketVisibility: state.modalWindow.cpuSocketVisibility
})

export default connect(mapStateToProps, {
    setError, setCpuSoketVisibility, addSocketCpuData,
})(ModalCpuSocketContainer)
