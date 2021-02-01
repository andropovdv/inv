/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import {
  getFormFactor,
  setCurrentFormFactor,
  deleteFormFactor,
} from "../../BLL/formFactorReducer";
import FormFactor from "./FormFactor";
import { setFormFactorVisinility } from "../../BLL/modalWindowReducer";

class FormFactorContainer extends React.Component {
  componentDidMount() {
    this.props.getFormFactor();
  }

  createModal = (toggle) => {
    if (toggle) {
      this.props.setCurrentFormFactor(null, null);
      this.props.setFormFactorVisinility(true);
    } else {
      this.props.setFormFactorVisinility(true);
    }
  };

  delete = () => {
    const res = window.confirm(
      `Вы действительно хотите удалить ${this.props.currentType.formFactor}`
    );
    if (res) {
      this.props.deleteFormFactor(this.props.currentType.idFormFactor);
    }
  };

  prevPage = () => {
    this.props.getFormFactor(this.props.pagination - 1);
  };

  nextPage = () => {
    this.props.getFormFactor(this.props.pagination + 1);
  };

  render() {
    return (
      <div>
        <FormFactor
          {...this.props}
          createModal={this.createModal}
          delete={this.delete}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formFactor: state.formFactor.formFactor,
  pagination: state.formFactor.pagination,
  currentType: state.formFactor.currentType,
  isLoading: state.formFactor.isLoading,
  errorCode: state.formFactor.errorCode,
  formFactorVisibility: state.modalWindow.formFactorVisibility,
});

export default connect(mapStateToProps, {
  getFormFactor,
  setCurrentFormFactor,
  setFormFactorVisinility,
  deleteFormFactor,
})(FormFactorContainer);
