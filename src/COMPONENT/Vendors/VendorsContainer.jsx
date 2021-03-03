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
      setCurrent(null, null, null, null);
      visibility(true);
    } else {
      visibility(true);
    }
  };

  closeModal = () => {
    const { visibility, setErrorCode } = this.props;
    setErrorCode(null);
    visibility(false);
  };

  updateVendor = (values) => {
    const { visibility, currentVendor, errorCode, updateVendor } = this.props;
    const vendorUp = {
      id: currentVendor.id,
      name: values.name,
      full: values.full,
      url: values.url,
    };
    updateVendor(vendorUp);
    if (errorCode === 0) {
      visibility(false);
      // FIXME нужно обнуление ошибки. Нужна проверка на дублирование
    }
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

  addVendor = (values) => {
    const { addVen } = this.props;
    const vendorNew = {
      name: values.name,
      full: values.full,
      url: values.url,
    };
    addVen(vendorNew).then((res) => {
      const { setErrorCode } = this.props;
      if (res.status) {
        this.closeModal();
      } else {
        setErrorCode(res.errorCode);
      }
    });
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
          vendorVisibility={vendorVisibility}
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
})(VendorsContainer);
