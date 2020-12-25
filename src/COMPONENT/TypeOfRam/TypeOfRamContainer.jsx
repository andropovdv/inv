import React from 'react';
import { connect } from 'react-redux';
import { getTypeOfRamData, setCurrentTypeOfRam } from '../../BLL/typeOfRamReducer'
import TypeOfRam from './TypeOfRam';

class TypeOfRamContainer extends React.Component {

    componentDidMount() {
        this.props.getTypeOfRamData();
    }

    render() {
        return (
            <TypeOfRam
                {...this.props} /> 
        ) 
    } 
}

let mapStateToProps = (state) => ({
    typeOfRam: state.typeOfRam.typeOfRam,
    typeOfRamAll: state.typeOfRam.typeOfRamAll,
    pagination: state.typeOfRam.pagination,
    currentType: state.typeOfRam.currentType,
    isLoading: state.typeOfRam.isLoading,
    errorCode: state.typeOfRam.errorCode
})

export default connect(mapStateToProps, { getTypeOfRamData, setCurrentTypeOfRam })(TypeOfRamContainer)
