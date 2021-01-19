import React from 'react';
import { connect } from 'react-redux';
import { setTypeOfGraphSlotVisibility} from '../../../../BLL/modalWindowReducer';
import ModalTest from '../ModalTest';
import { addTypeOfGraphSlot, updateTypeOfGraphSlot } from '../../../../BLL/typeOfGraphSlotReducer';
import TypeOfGraphReduxForm from './TypeOfGraphSlotForm'

class ModalTypeOfGraphSlotContainer extends React.Component {

    closeModal = () => {
        this.props.setTypeOfGraphSlotVisibility(false);
    };

    addTypeOfGraph = (values) => {
        let typeOfGraph = {
            typeOfGraphSlot: values.typeOfGraphSlot
        };
        this.props.addTypeOfGraphSlot(typeOfGraph)
        this.props.setTypeOfGraphSlotVisibility(false)
    }

    editTypeOfGraphSlot = (values) => {
        let typeOfGraphSlot = {
            idTypeOfGraphSlot: this.props.currentType.idTypeOfGraphSlot,
            typeOfGraphSlot: values.typeOfGraphSlot
        }
        this.props.updateTypeOfGraphSlot(typeOfGraphSlot);
        this.props.setTypeOfGraphSlotVisibility(false)
    }

    render() {
        return (
            <ModalTest header={this.props.header} closeModal={this.closeModal}>
                <TypeOfGraphReduxForm onSubmit={this.props.type ? this.editTypeOfGraphSlot : this.addTypeOfGraph}/>
            </ModalTest>
        )
    }
}

let mapStateToProps = (state) => ({
    currentType: state.typeOfGraphSlot.currentType
})

export default connect(mapStateToProps, {
    setTypeOfGraphSlotVisibility, addTypeOfGraphSlot,
    updateTypeOfGraphSlot
})(ModalTypeOfGraphSlotContainer)