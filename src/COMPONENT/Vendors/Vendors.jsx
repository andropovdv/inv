import React from 'react';
import s from './Vendors.module.css';
import { connect } from 'react-redux'
import { getVendorsData } from '../../BLL/vendorReducer';
import Preloader from '../Common/Preloader';
import { VendorItem } from './VendorItem';

class Vendor extends React.Component {

    componentDidMount() {
        this.props.getVendorsData();
    }

    render() {
        debugger
        if (this.props.isLoading) {
            return <Preloader />
        }
        return (
            <div className={s.vendorWrapper}>
                <div className={s.vendorLabel}>
                    Производители:
                </div>
                <div className={s.vendorContent}>
                    <table className={s.table2}>
                        <th>Name</th>
                        <th>Full Name</th>
                        <th></th><th></th>
                        {this.props.vendors.map(v =>
                            <VendorItem
                                id_vendor={v.id_vendor}
                                name={v.name}
                                full_name={v.full_name}
                            />)}
                    </table>
                </div>

            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    vendors: state.vendor.vendors,
    isLoading: state.vendor.isLoading
})


export default connect(mapStateToProps, { getVendorsData })(Vendor);


