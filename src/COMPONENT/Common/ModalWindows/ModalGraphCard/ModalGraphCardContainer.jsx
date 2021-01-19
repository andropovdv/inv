import React from 'react';
import { connect } from 'react-redux';
import { setGraphCardVisibility } from '../../../../BLL/modalWindowReducer';
import ModalTest from '../ModalTest';

class ModalGraphCardContainer extends React.Component {

    closeModal = () => {
        this.props.setGraphCardVisibility(false);
    }

    render() {
        return (
            <div>
                <ModalTest closeModal={this.closeModal} header={this.props.header}>
                    ТЕСТ
                </ModalTest>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    currentRow: state.graphCard.currentRow
})

export default connect(mapStateToProps, {
    setGraphCardVisibility
})(ModalGraphCardContainer)