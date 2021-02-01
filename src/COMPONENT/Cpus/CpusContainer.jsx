import React from "react";
import { connect } from "react-redux";
import Cpus from "./Cpus";
import {
  setCpuSoketVisibility,
  setVendorVisibility,
} from "../../BLL/modalWindowReducer";
import {
  getCpusData,
  setCurrentCpu,
  updateCpusData,
  deleteCpusData,
  addCpusData,
  setError,
} from "../../BLL/cpuReducer";
import { setCurrentVendor } from "../../BLL/vendorReducer";
import CpusUI from "./CpusUI";

class CpusContainer extends React.Component {
  state = {
    isVisable: false,
    header: "",
    typeModal: false,
  };

  componentDidMount() {
    this.props.getCpusData();
  }

  openModalTest = () => {
    this.props.setCpuSoketVisibility(true);
  };

  closeModal = () => {
    this.setState({ isVisable: false });
    this.props.setError(0);
  };

  openModalNew = () => {
    this.props.setCurrentCpu(null, null, null);
    this.setState({ typeModal: false });
    this.setState({ header: "Добавляем" });
    this.setState({ isVisable: true });
  };
  openModalEdit = () => {
    this.setState({ typeModal: true });
    this.setState({ header: "Редактируем:" });
    this.setState({ isVisable: true });
  };
  addCpu = (values) => {
    let cpu = {
      vendor: values.vendor,
      model: values.model,
      name_typeSocketCpu: values.name_typeSocketCpu,
    };
    this.props.addCpusData(cpu);
    this.setState({ isVisable: false });
  };
  updateCpu = (values) => {
    let updateCpu = {
      id_cpu: this.props.currentCpu.id_cpu,
      vendor: values.vendor,
      model: values.model,
      name_typeSocketCpu: values.name_typeSocketCpu,
    };
    this.props.updateCpusData(updateCpu);
    this.setState({ isVisable: false });
  };
  deleteCpu = (id_cpu) => {
    let result = window.confirm(`Вы действительно хотите удалить 
            ${this.props.currentCpu.vendor} ${this.props.currentCpu.model}`);
    let cpu = {
      id_cpu: id_cpu,
    };
    if (result) {
      this.props.deleteCpusData(cpu);
    }
  };
  prevPage = () => {
    this.props.getCpusData(this.props.pagination.current - 1);
  };
  nextPage = () => {
    this.props.getCpusData(this.props.pagination.current + 1);
  };

  render() {
    return (
      <div>
        {/* <Cpus
                    {...this.props}
                    closeModal={this.closeModal}
                    openModalEdit={this.openModalEdit}
                    openModalNew={this.openModalNew}
                    isVisable={this.state.isVisable}
                    header={this.state.header}
                    typeModal={this.state.typeModal}
                    updateCpu={this.updateCpu}
                    addCpu={this.addCpu}
                    deleteCpu={this.deleteCpu}
                    prevPage={this.prevPage}
                    nextPage={this.nextPage}
                    openModalTest={this.openModalTest} /> */}
        <CpusUI />
      </div>
    );
  }
}

const mapSateToProps = (state) => ({
  cpus: state.cpu.cpus,
  pagination: state.cpu.pagination,
  currentCpu: state.cpu.currentCpu,
  isLoading: state.cpu.isLoading,
  errorCode: state.cpu.errorCode,
  cpuSocketVisibility: state.modalWindow.cpuSocketVisibility,
  vendorVisibility: state.modalWindow.vendorVisibility,
});

export default connect(mapSateToProps, {
  getCpusData,
  setCurrentCpu,
  updateCpusData,
  deleteCpusData,
  addCpusData,
  setError,
  setCpuSoketVisibility,
  setVendorVisibility,
  setCurrentVendor,
})(CpusContainer);
