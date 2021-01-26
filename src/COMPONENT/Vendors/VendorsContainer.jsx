import React from 'react';
import { connect } from "react-redux"
import {
    getVendorsData, setCurrentVendor, updateVendorData,
    deleteVendorData, addVendorData, setError
} from '../../BLL/vendorReducer';
import Vendors from "./Vendors";
import VendorUI from './VendorUI';
import { setVendorVisibility } from '../../BLL/modalWindowReducer';


class VendorsContainer extends React.Component {

    // state = {
    //     isVisable: false,
    //     header: '',
    //     typeModal: false
    // }

    componentDidMount() {
        this.props.getVendorsData();
    }

    // closeModal = () => {
    //     this.setState({ isVisable: false });
    //     this.props.setError(0);
    // }

    createDialog = (toggle) => {
        if (toggle) {
            this.props.setCurrentVendor(null, null, null, null, null);
            this.props.setVendorVisibility(true);
        } else {
            this.props.setVendorVisibility(true);
        }
    }

    openModalNew = () => {
        this.props.setCurrentVendor(null, null, null);
        this.setState({
            isVisable: true,
            header: 'Добавляем:',
            typeModal: false
        })
    }

    openModalEdit = () => {
        this.setState({
            isVisable: true,
            header: 'Редактируем:',
            typeModal: true
        });
    }

    addVendor = (values) => {
        let vendorNew = {
            name: values.name,
            full_name: values.full_name,
            url: values.url
        }
        this.props.addVendorData(vendorNew);
        this.props.setVendorVisibility(false);
    }

    updateVendor = (values) => {
        let vendorUp = {
            id_vendor: this.props.currentVendor.id_vendor,
            name: values.name,
            full_name: values.full_name,
            url: values.url
        }
        debugger
        this.props.updateVendorData(vendorUp);
        this.props.setVendorVisibility(false);
    }

    deleteVendor = () => {
        this.props.deleteVendorData({ "id_vendor": this.props.currentVendor.id_vendor });
        this.props.setVendorVisibility(false);
    }

    render() {
        return (
            <div>
                <VendorUI
                    {...this.props}
                    prevPage={this.prevPage}
                    nextPage={this.nextPage}
                    createDialog={this.createDialog}
                    updateVendor={this.updateVendor}
                    addVendor={this.addVendor}
                    deleteVendor={this.deleteVendor}
                />
                {/* <Vendors
                    {...this.props}
                    closeModal={this.closeModal}
                    openModalNew={this.openModalNew}
                    openModalEdit={this.openModalEdit}
                    prevPage={this.prevPage}
                    nextPage={this.nextPage}
                    typeModal={this.state.typeModal}
                    isVisable={this.state.isVisable}
                    updateVendor={this.updateVendor}
                    addVendor={this.addVendor}
                    deleteVendor={this.deleteVendor} /> */}
            </div>
        )
    }
}

let mapsStateToProps = (state) => ({
    vendors: state.vendor.vendors,
    currentVendor: state.vendor.currentVendor,
    isLoading: state.vendor.isLoading,
    pagination: state.vendor.pagination,
    errorCode: state.vendor.errorCode,
    vendorVisibility: state.modalWindow.vendorVisibility
})

export default connect(mapsStateToProps,
    {
        getVendorsData, setCurrentVendor, updateVendorData,
        deleteVendorData, addVendorData, setError, setVendorVisibility
    })(VendorsContainer)