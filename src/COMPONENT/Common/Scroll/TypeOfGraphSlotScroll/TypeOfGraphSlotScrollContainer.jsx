import React from 'react';
import { connect } from 'react-redux';
import { getAllTypeOfGraphSlot } from '../../../../BLL/typeOfGraphSlotReducer'

class TypeOfGraphSlotScroll extends React.Component {

    componentDidMount() {
        this.props.getAllTypeOfGraphSlot();
    }

    render() {
        const { input } = this.props;
        return (
            <span disabled={this.props.isLoading}>
                <select {...input}>
                <option>/</option>
                {this.props.typeAllOfGraphSlot.map(s =>
                    <option key={s.idTypeOfGraphSlot} value={s.typeOfGraphSlot}>{s.typeOfGraphSlot}</option>)}
                </select>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.typeOfGraphSlot.isLoading,
    typeAllOfGraphSlot: state.typeOfGraphSlot.typeAllOfGraphSlot
})

export default connect(mapStateToProps, { getAllTypeOfGraphSlot })(TypeOfGraphSlotScroll);