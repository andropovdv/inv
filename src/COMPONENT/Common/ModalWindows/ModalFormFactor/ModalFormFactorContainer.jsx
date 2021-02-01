import React from "react";
import { connect } from "react-redux";
import { setFormFactorVisinility } from "../../../../BLL/modalWindowReducer";
import ModalTest from "../ModalTest";
import FormFactorReduxForm from "./FormFactorForm";
import {
  addFormFactor,
  updateFormFactor,
} from "../../../../BLL/formFactorReducer";

class ModalFormFactorContainer extends React.Component {
  closeModal = () => {
    this.props.setFormFactorVisinility(false);
  };

  addFormFactor = (values) => {
    let formFactor = {
      formFactor: values.formFactor,
    };
    this.props.addFormFactor(formFactor);
    this.props.setFormFactorVisinility(false);
  };

  editFormFactor = (values) => {
    let formFactor = {
      idFormFactor: this.props.currentType.idFormFactor,
      formFactor: values.formFactor,
    };
    this.props.updateFormFactor(formFactor);
    this.props.setFormFactorVisinility(false);
  };

  render() {
    return (
      <div>
        <ModalTest header={this.props.header} closeModal={this.closeModal}>
          <FormFactorReduxForm
            onSubmit={
              this.props.type ? this.editFormFactor : this.addFormFactor
            }
          />
        </ModalTest>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  currentType: state.formFactor.currentType,
});

export default connect(mapStateToProps, {
  setFormFactorVisinility,
  addFormFactor,
  updateFormFactor,
})(ModalFormFactorContainer);
