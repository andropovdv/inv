import React from 'react';
import { connect } from 'react-redux';
import { getAllTypeOfRam } from '../../../../BLL/typeOfRamReducer';

class TypeOfRamScroll extends React.Component {

    componentDidMount() {
        this.props.getAllTypeOfRam();
    }

    render() {
        const { input } = this.props;
        //TODO проверь блокировку span
        return (
            <span disabled={this.props.isLoading}>
                <select {...input}>
                    <option>/</option>
                    {this.props.typeOfRamAll.map(s =>
                        <option key={s.id_typeRam} value={s.typeOfRam}>{s.typeOfRam}</option>)}
                </select>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.typeOfRam.isLoading,
    typeOfRamAll: state.typeOfRam.typeOfRamAll
})

export default connect(mapStateToProps, { getAllTypeOfRam })(TypeOfRamScroll);
