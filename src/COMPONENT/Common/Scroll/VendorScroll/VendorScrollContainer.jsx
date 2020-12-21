import React from 'react';
import { connect } from 'react-redux';
// import Preloader from '../../Preloader';
import { getVendorAllData } from './../../../../BLL/vendorReducer';
import VendorScroll from './VendorScroll';

class VendorScrollContainer extends React.Component {

    componentDidMount() {
        this.props.getVendorAllData();
    }

    render() {
        const { input } = this.props
        return (
            <span disabled={this.props.isLoading}>
                {/* {this.props.isLoading ? <Preloader /> : null} */}
                <select {...input}>
                    {this.props.vendorsAll.map(v => <VendorScroll key={v.id_vendor} index={v.id_vendor} vendor={v.name} />)}
                </select>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    vendorsAll: state.vendor.vendorsAll,
    isLoading: state.vendor.isLoading
})

export default connect(mapStateToProps, { getVendorAllData })(VendorScrollContainer)