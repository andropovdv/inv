import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { setTypeOfRamVisibility } from '../../../../BLL/modalWindowReducer';
import { addTypeOfRamData, updateTypeOfRamData } from '../../../../BLL/typeOfRamReducer';
import TypeOfRamReduxForm from './TypeOfRamForm';

class ModalTypeOfRamContainer extends React.Component {

    closeModal = () => {
        this.props.setTypeOfRamVisibility(false)
    }

    addTypeOfRam = (values) => {
        let typeOfRam = {
            typeOfRam: values.typeOfRam
        };
        this.props.addTypeOfRamData(typeOfRam);
        this.props.setTypeOfRamVisibility(false);
    }

    editTypeOfRam = (values) => {
        let typeOfRam = {
            id_typeRam: this.props.currentType.id_typeRam,
            typeOfRam: values.typeOfRam
        };
        this.props.updateTypeOfRamData(typeOfRam);
        this.props.setTypeOfRamVisibility(false)
    }

    render() {
        return (
            <div>
                <Modal header={this.props.header} closeModal={this.closeModal}>
                    <TypeOfRamReduxForm onSubmit={this.props.type ? this.editTypeOfRam : this.addTypeOfRam}/>
                </Modal>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    currentType: state.typeOfRam.currentType
})


export default connect(mapStateToProps, {
    setTypeOfRamVisibility, addTypeOfRamData, updateTypeOfRamData
})(ModalTypeOfRamContainer)
