import React from 'react';
import s from './Vendors.module.css';
import { connect } from 'react-redux'
import {
    getVendorsData, setCurrentVendor,
    updateVendorData, deleteVendorData, addVendorData
} from '../../BLL/vendorReducer';
import Preloader from '../Common/Preloader';
import VendorItem from './VendorItem';
import VendorModal from './VendorModal';
import { VendorReduxForm } from './VendorForm';

class Vendor extends React.Component {

    state = {
        isVisibleModal: false,
        textModal: 'Редактируем:',
        typeModal: false
    }

    componentDidMount() {
        this.props.getVendorsData();
    }

    updateVendor = (values) => {
        let updateVendor = {
            id_vendor: this.props.currentVendorId,
            name: values.name,
            full_name: values.full_name,
            url: values.url
        };
        this.props.updateVendorData(updateVendor);
        this.setState({ isVisibleModal: false });
    }

    addVendor = (values) => {
        let newVendor = {
            name: values.name,
            full_name: values.full_name,
            url: values.url
        };
        this.props.addVendorData(newVendor);
        this.setState({ isVisibleModal: false });
    }

    deleteVendor = (idVendor) => {
        let result = window.confirm(`Вы действительно хотите удалить ${this.props.currentVendorName}`)
        if (result) {
            let vendor = {
                "id_vendor": idVendor
            }
            this.props.deleteVendorData(vendor);
        }
    }

    openModalNew = () => {
        this.props.setCurrentVendor(null, null, null);
        this.setState({ textModal: 'Добавляем:' })
        this.setState({ isVisibleModal: true })

    }

    openModalEdit = () => {
        this.setState({ typeModal: true })
        this.setState({ textModal: 'Редактируем:' })
        this.setState({ isVisibleModal: true })
    }

    closeModal = () => {
        this.setState({ isVisibleModal: false })
    }

    clickLeft = () => {
        debugger
        this.props.getVendorsData(this.props.pagination.current - 1);
    }

    clickNext = () => {
        this.props.getVendorsData(this.props.pagination.current + 1);
    }

    render() {
        return (
            <div className={s.vendorWrapper}>
                <div className={s.vendorLabel}>
                    Производители:
                </div>
                <div className={s.vendorContent}>
                    <div className={s.buttonArea}>
                        <button onClick={this.openModalNew} >Добавить производителя</button>
                        <button onClick={this.clickLeft}
                            disabled={typeof this.props.pagination.prev !== 'undefined' ? false : true}>
                            Предыдущая
                        </button>
                        {this.props.pagination.current + 1}из{this.props.pagination.numPages}
                        <button onClick={this.clickNext}
                            disabled={typeof this.props.pagination.next !== 'undefined' ? false : true}>
                            Следующая
                        </button>

                    </div>
                    {this.props.isLoading && <Preloader/>}
                    <table className={s.table2}>
                        <tbody>
                            <tr><th>Name</th><th>Full Name</th><th></th><th></th></tr>
                            {this.props.vendors.map(v =>
                                <VendorItem
                                    id_vendor={v.id_vendor}
                                    name={v.name}
                                    full_name={v.full_name}
                                    setCurrentVendor={this.props.setCurrentVendor}
                                    currentVendorId={this.props.currentVendorId}
                                    state={this.state}
                                    openModal={this.openModalEdit}
                                    deleteVendor={this.deleteVendor} />)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <VendorModal isOpen={this.state.isVisibleModal}
                        onClose={this.closeModal}>
                        <div>
                            {this.state.textModal}<br></br>
                            {this.props.currentVendorFullName}
                            <VendorReduxForm
                                onSubmit={this.state.typeModal ? this.updateVendor : this.addVendor}
                                // onSubmit={this.updateVendor}
                                {...this.props} />
                        </div>
                    </VendorModal>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    vendors: state.vendor.vendors,
    isLoading: state.vendor.isLoading,
    currentVendorId: state.vendor.currentVendorId,
    currentVendorName: state.vendor.currentVendorName,
    currentVendorFullName: state.vendor.currentVendorFullName,
    pagination: state.vendor.pagination
})


export default connect(mapStateToProps,
    {
        getVendorsData, setCurrentVendor, updateVendorData,
        deleteVendorData, addVendorData
    })(Vendor);


