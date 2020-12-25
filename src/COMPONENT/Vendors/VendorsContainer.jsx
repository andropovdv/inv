import React from 'react';
import { connect } from "react-redux"
import {
    getVendorsData, setCurrentVendor, updateVendorData,
    deleteVendorData, addVendorData, setError
} from '../../BLL/vendorReducer';
import Vendors from "./Vendors";


class VendorsContainer extends React.Component {

    state = {
        isVisable: false,
        header: '',
        typeModal: false
    }

    componentDidMount() {
        this.props.getVendorsData();
    }

    closeModal = () => {
        this.setState({ isVisable: false });
        this.props.setError(0);
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
        this.setState({ isVisable: false })
    }

    updateVendor = (values) => {
        let vendorUp = {
            id_vendor: this.props.currentVendor.id_vendor,
            name: values.name,
            full_name: values.full_name,
            url: values.url
        }
        this.props.updateVendorData(vendorUp);
        this.setState({ isVisable: false })
    }

    deleteVendor = (id) => {
        let result = window.confirm(`Вы действительно хотите удалить ${this.props.currentVendor.name}`)
        if (result) {
            // let vendor = { "id_vendor": id }
            this.props.deleteVendorData({ "id_vendor": id });
        }
        // this.props.deleteVendorData({ "id_vendor": id });
    }

    prevPage = () => {
        this.props.getVendorsData(this.props.pagination.current - 1)
    }

    nextPage = () => {
        this.props.getVendorsData(this.props.pagination.current + 1)
    }

    render() {
        return (
            <div>
                <Vendors
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
                    deleteVendor={this.deleteVendor} />
            </div>
        )
    }
}

let mapsStateToProps = (state) => ({
    vendors: state.vendor.vendors,
    currentVendor: state.vendor.currentVendor,
    isLoading: state.vendor.isLoading,
    pagination: state.vendor.pagination,
    errorCode: state.vendor.errorCode
})

export default connect(mapsStateToProps,
    {
        getVendorsData, setCurrentVendor, updateVendorData,
        deleteVendorData, addVendorData, setError
    })(VendorsContainer)