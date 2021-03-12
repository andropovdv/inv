/* eslint-disable no-debugger */
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
  setBackEndMessage,
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
      setCurrent(null, null, null, null);
      visibility(true);
    } else {
      visibility(true);
    }
  };

  closeModal = () => {
    const { visibility } = this.props;
    visibility(false);
  };

  resetError = () => {
    const { setErrorCode, setErrorMessage } = this.props;
    setErrorCode(null);
    setErrorMessage("");
  };

  deleteVendor = () => {
    const { deleteVendor, visibility, currentVendor } = this.props;
    deleteVendor({ ...currentVendor });
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

  addVendor = async (values) => {
    const { addVen, visibility } = this.props;
    const vendorNew = {
      name: values.name,
      full: values.full,
      url: values.url,
    };
    await addVen(vendorNew);
    visibility(false);
  };

  updateVendor = async (values) => {
    const { currentVendor, updateVendor, visibility } = this.props;
    const vendorUp = {
      id: currentVendor.id,
      name: values.name,
      full: values.full,
      url: values.url,
    };
    await updateVendor(vendorUp);
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
      vendorVisibility,
      errorMessage,
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
          resetError={this.resetError}
          setCurrent={setCurrent}
          vendorVisibility={vendorVisibility}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}

VendorsContainer.propTypes = {
  getVendors: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  visibility: PropTypes.func.isRequired,
  addVen: PropTypes.func.isRequired,
  errorCode: PropTypes.number,
  currentVendor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    full: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  updateVendor: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
  deleteVendor: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  setErrorCode: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      full: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchField: PropTypes.string.isRequired,
  vendorVisibility: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

VendorsContainer.defaultProps = {
  errorCode: null,
};

const mapsStateToProps = (state) => ({
  vendors: state.vendor.vendors, //
  currentVendor: state.vendor.currentVendor, //
  isLoading: state.vendor.isLoading, //
  pagination: state.vendor.pagination, //
  errorCode: state.vendor.errorCode, //
  searchField: state.vendor.searchField, //
  vendorVisibility: state.modalWindow.vendorVisibility, // FIXME насколько необходимо ?
  errorMessage: state.vendor.backEndMessage,
});

export default connect(mapsStateToProps, {
  getVendors: getVendorsData,
  setCurrent: setCurrentVendor,
  updateVendor: updateVendorData,
  deleteVendor: deleteVendorData,
  addVen: addVendorData,
  setErrorCode: setError,
  visibility: setVendorVisibility,
  change: changeSearch,
  getSearch: getSearchData,
  setErrorMessage: setBackEndMessage,
})(VendorsContainer);
