import React from 'react';
import { connect } from 'react-redux';
import { setVendorVisibility } from '../../../../BLL/modalWindowReducer'
import { addVendorData, setCurrentVendor } from '../../../../BLL/vendorReducer'
import VendorReduxForm from '../../../Vendors/VendorForm';
import Modal from '../Modal';

class ModalVendorContainer extends React.Component {

    closeModal = () => {
        this.props.setVendorVisibility(false);
    }

    addVendor = (values) => {
        let vendorNew = {
            name: values.name,
            full_name: values.name,
            url: values.url
        }
        this.props.addVendorData(vendorNew);
        this.props.setVendorVisibility(false);
    }

    render() {
        return (
            <div>
                <Modal {...this.props} closeModal={this.closeModal} header={'Добавить производителя'}>
                    <VendorReduxForm onSubmit={this.addVendor} />
                </Modal>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    vendorVisibility: state.modalWindow.vendorVisibility
})

export default connect(mapStateToProps, {
    setVendorVisibility, addVendorData, setCurrentVendor
})(ModalVendorContainer)