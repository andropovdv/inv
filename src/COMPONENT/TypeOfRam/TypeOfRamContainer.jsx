import React from 'react';
import { connect } from 'react-redux';
import {
    getTypeOfRamData, setCurrentTypeOfRam, 
    deleteTypeOfRamData, setErrorCode
} from '../../BLL/typeOfRamReducer'
import TypeOfRam from './TypeOfRam';
import { setTypeOfRamVisibility } from '../../BLL/modalWindowReducer';

class TypeOfRamContainer extends React.Component {

    componentDidMount() {
        this.props.getTypeOfRamData();
    }

    createModal = (flag) => {
        if (flag) {
            this.props.setCurrentTypeOfRam(null, null)
            this.props.setTypeOfRamVisibility(true)
        } else {
            this.props.setTypeOfRamVisibility(true)
        }
    }

    deleteTypeOfRam = () => {
        let res = window.confirm(`Вы действительно хотите удалить ${this.props.currentType.typeOfRam}`)
        if (res) {
            this.props.deleteTypeOfRamData(this.props.currentType.id_typeRam);
        }
    }

    prevPage = () => {
        this.props.getTypeOfRamData(this.props.pagination.current - 1)
    }

    nextPage = () => {
        this.props.getTypeOfRamData(this.props.pagination.current + 1)
    }

    render() {
        return (
            <TypeOfRam
                {...this.props}
                createModal={this.createModal}
                delete={this.deleteTypeOfRam}
                prevPage={this.prevPage}
                nextPage={this.nextPage} />
        )
    }
}

let mapStateToProps = (state) => ({
    typeOfRam: state.typeOfRam.typeOfRam,
    typeOfRamAll: state.typeOfRam.typeOfRamAll,
    pagination: state.typeOfRam.pagination,
    currentType: state.typeOfRam.currentType,
    isLoading: state.typeOfRam.isLoading,
    errorCode: state.typeOfRam.errorCode,
    typeOfRamVisibility: state.modalWindow.typeOfRamVisibility
})

export default connect(mapStateToProps, {
    getTypeOfRamData, setCurrentTypeOfRam,
    setTypeOfRamVisibility, deleteTypeOfRamData,
    setErrorCode
})(TypeOfRamContainer)
