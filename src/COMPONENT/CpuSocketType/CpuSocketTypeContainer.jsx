/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React from "react";
import { connect } from "react-redux";
import {
  getSocketCpuData,
  setCurrentSocketCpu,
  setError,
  updateSocketCpuData,
  addSocketCpuData,
  deleteSoketCpuData,
} from "../../BLL/typeSocketCpuReducer";
import CpuSocketType from "./CpuSocketType";
import { setCpuSoketVisibility } from "../../BLL/modalWindowReducer";

class CpuSocketTypeContainer extends React.Component {
  state = {
    isVisable: false,
    header: "",
    typeModal: false,
  };

  componentDidMount() {
    this.props.getSocketCpuData();
  }

  openModalTest = () => {
    this.props.setCpuSoketVisibility(true);
  };

  openModalEdit = () => {
    this.setState({ isVisable: true });
    this.setState({ header: "Редактируем" });
    this.setState({ typeModal: true });
  };

  openModalNew = () => {
    this.props.setCurrentSocketCpu(null, null);
    this.setState({ isVisable: true });
    this.setState({ header: "Добавляем" });
    this.setState({ typeModal: false });
  };

  closeModal = () => {
    this.setState({ isVisable: false });
    this.props.setError(0);
  };

  updateTypeSocket = (values) => {
    const updateTypeSocket = {
      id_typeSocketCpu: this.props.currentType.id_typeSocketCpu,
      name_typeSocketCpu: values.name_typeSocketCpu,
    };
    this.props.updateSocketCpuData(updateTypeSocket);
    this.setState({ isVisable: false });
  };

  addTypeSocket = (values) => {
    const typeSocket = { name_typeSocketCpu: values.name_typeSocketCpu };
    this.props.addSocketCpuData(typeSocket);
    this.setState({ isVisable: false });
  };

  deleteTypeSocket = () => {
    const result = window.confirm(`Вы действительно хотите удалить разъем 
        ${this.props.currentType.name_typeSocketCpu}`);
    const id = {
      id_typeSocketCpu: this.props.currentType.id_typeSocketCpu,
    };
    if (result) {
      this.props.deleteSoketCpuData(id);
    }
  };

  prevPage = () => {
    this.props.getSocketCpuData(this.props.pagination.current - 1);
  };

  nextPage = () => {
    this.props.getSocketCpuData(this.props.pagination.current + 1);
  };

  render() {
    return (
      <div>
        <CpuSocketType
          {...this.props}
          onClose={this.closeModal}
          openModalEdit={this.openModalEdit}
          openModalNew={this.openModalNew}
          isVisable={this.state.isVisable}
          header={this.state.header}
          typeModal={this.state.typeModal}
          updateTypeSocket={this.updateTypeSocket}
          addTypeSocket={this.addTypeSocket}
          deleteTypeSocket={this.deleteTypeSocket}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          openModalTest={this.openModalTest}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cpuSockets: state.typeCpuSocket.cpuSockets,
  pagination: state.typeCpuSocket.pagination,
  currentType: state.typeCpuSocket.currentType,
  isLoading: state.typeCpuSocket.isLoading,
  errorCode: state.typeCpuSocket.errorCode,
  cpuSocketVisibility: state.modalWindow.cpuSocketVisibility,
});

export default connect(mapStateToProps, {
  getSocketCpuData,
  setCurrentSocketCpu,
  setError,
  updateSocketCpuData,
  addSocketCpuData,
  deleteSoketCpuData,
  setCpuSoketVisibility,
})(CpuSocketTypeContainer);
