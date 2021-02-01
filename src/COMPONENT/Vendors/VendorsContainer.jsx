import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getVendorsData,
  setCurrentVendor,
  updateVendorData,
  deleteVendorData,
  addVendorData,
  setError,
  changeSearch,
  getSearchData,
} from "../../BLL/vendorReducer";
import VendorUI from "./VendorUI";
import { setVendorVisibility } from "../../BLL/modalWindowReducer";

class VendorsContainer extends React.Component {
  componentDidMount() {
    const { getVendors } = this.props;
    getVendors();
  }

  createDialog = (toggle) => {
    const { setCurrent, visibility } = this.props;
    if (toggle) {
      setCurrent(null, null, null, null, null);
      visibility(true);
    } else {
      visibility(true);
    }
  };

  addVendor = (values) => {
    const { visibility, addVendor, errorCode } = this.props;
    const vendorNew = {
      name: values.name,
      full_name: values.full_name,
      url: values.url,
    };
    addVendor(vendorNew);
    if (typeof errorCode === "undefined") {
      visibility(false);
      // FIXME нужно обнуление ошибки
    }
  };

  updateVendor = (values) => {
    const { visibility, currentVendor, errorCode, updateVendor } = this.props;
    const vendorUp = {
      id_vendor: currentVendor.id_vendor,
      name: values.name,
      full_name: values.full_name,
      url: values.url,
    };
    updateVendor(vendorUp);
    if (typeof errorCode === "undefined") {
      visibility(false);
      // FIXME нужно обнуление ошибки
    }
  };

  deleteVendor = () => {
    const { deleteVendor, visibility, currentVendor } = this.props;
    deleteVendor({
      id_vendor: currentVendor.id_vendor,
    });
    visibility(false);
  };

  prevPage = () => {
    const { getVendors, pagination } = this.props;
    getVendors(pagination.current - 1);
  };

  nextPage = () => {
    const { getVendors, pagination } = this.props;
    getVendors(pagination.current + 1);
  };

  onClear = () => {
    const { getVendors, change } = this.props;
    change("");
    getVendors();
  };

  onSearch = (e) => {
    const { getSearch } = this.props;
    const text = e.target.value;
    getSearch(text);
  };

  closeModal = () => {
    const { visibility } = this.props;
    visibility(false);
  };

  render() {
    const {
      vendors,
      currentVendor,
      isLoading,
      pagination,
      errorCode,
      searchField,
      setCurrent,
    } = this.props;
    return (
      <div>
        <VendorUI
          vendors={vendors}
          currentVendor={currentVendor}
          isLoading={isLoading}
          pagination={pagination}
          errorCode={errorCode}
          searchField={searchField}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          createDialog={this.createDialog}
          updateVendor={this.updateVendor}
          addVendor={this.addVendor}
          deleteVendor={this.deleteVendor}
          onClear={this.onClear}
          onSearch={this.onSearch}
          closeModal={this.closeModal}
          setCurrent={setCurrent}
        />
      </div>
    );
  }
}

VendorsContainer.propTypes = {
  getVendors: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  visibility: PropTypes.func.isRequired,
  addVendor: PropTypes.func.isRequired,
  errorCode: PropTypes.number.isRequired,
  currentVendor: PropTypes.objectOf([PropTypes.number, PropTypes.stirng])
    .isRequired,
  updateVendor: PropTypes.func.isRequired,
  pagination: PropTypes.objectOf([PropTypes.number, PropTypes.stirng])
    .isRequired,
  deleteVendor: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  vendors: PropTypes.objectOf([PropTypes.number, PropTypes.stirng]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchField: PropTypes.string.isRequired,
};

const mapsStateToProps = (state) => ({
  vendors: state.vendor.vendors, //
  currentVendor: state.vendor.currentVendor, //
  isLoading: state.vendor.isLoading, //
  pagination: state.vendor.pagination, //
  errorCode: state.vendor.errorCode, //
  searchField: state.vendor.searchField, //
  vendorVisibility: state.modalWindow.vendorVisibility, // FIXME насколько необходимо ?
});

export default connect(mapsStateToProps, {
  getVendors: getVendorsData,
  setCurrent: setCurrentVendor,
  updateVendor: updateVendorData,
  deleteVendor: deleteVendorData,
  addVendor: addVendorData,
  setError,
  visibility: setVendorVisibility,
  change: changeSearch,
  getSearch: getSearchData,
})(VendorsContainer);
