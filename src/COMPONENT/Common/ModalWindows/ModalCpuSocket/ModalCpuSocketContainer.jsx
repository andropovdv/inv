/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
// import s from './ModalCpu.module.css';
import { setError } from "../../../../BLL/cpuReducer";
import { setCpuSoketVisibility } from "../../../../BLL/modalWindowReducer";
import CpuSocketReduxForm from "../../../CpuSocket/CpuSocketForm";
import { addSocketCpuData } from "../../../../BLL/typeSocketCpuReducer";
import Modal from "../Modal";

/**
 *
 * @param {{header: string, subheader: string, imageAlt: string, contentList: Array, orderLink: Object, contentLink: Object}} props
 */

class ModalCpuSocketContainer extends React.Component {
  closeModal = () => {
    const { setVisibility } = this.props;
    setVisibility(false);
  };

  addSocketCpu = (values) => {
    const { setVisibility, addSocketCpu } = this.props;
    const typeSocket = { name_typeSocketCpu: values.name_typeSocketCpu };
    addSocketCpu(typeSocket);
    setVisibility(false);
  };

  render() {
    const { addSocketCpu } = this.props;
    return (
      <div>
        <Modal
          {...this.props}
          closeModal={this.closeModal}
          header="Добавить разъем процессора"
        >
          <CpuSocketReduxForm onSubmit={addSocketCpu} />
        </Modal>
      </div>
    );
  }
}

ModalCpuSocketContainer.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  addSocketCpu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cpuSocketVisibility: state.modalWindow.cpuSocketVisibility,
});

export default connect(mapStateToProps, {
  setError,
  setVisibility: setCpuSoketVisibility,
  addSocketCpu: addSocketCpuData,
})(ModalCpuSocketContainer);
