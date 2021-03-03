import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  setCpuSoketVisibility,
  setVendorVisibility,
  setCpuVisibility,
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
  componentDidMount() {
    const { getCpus } = this.props;
    getCpus();
  }

  createDialog = (toggle) => {
    const { setCurrent, cpuModalVisibility } = this.props;
    if (toggle) {
      setCurrent(null, null, null, null);
      cpuModalVisibility(true);
    } else {
      cpuModalVisibility(true);
    }
  };

  closeModal = () => {
    const { cpuModalVisibility } = this.props;
    cpuModalVisibility(false);
  };

  addCpu = (values) => {
    const { cpuModalVisibility, addCpu, errorCode } = this.props;
    const cpu = {
      vendor: values.vendor,
      model: values.model,
      name_typeSocketCpu: values.name_typeSocketCpu,
    };
    addCpu(cpu);
    if (typeof errorCode === "undefined") {
      cpuModalVisibility(false); // FIXME необходимо обнуление ошибки
    }
  };

  updateCpu = (values) => {
    const { cpuModalVisibility, currentCpu, errorCode, updateCpu } = this.props;
    const upCpu = {
      id_cpu: currentCpu.id,
      vendor: values.vendor,
      model: values.model,
      name_typeSocketCpu: values.name_typeSocketCpu,
    };
    updateCpu(upCpu);
    if (typeof errorCode === "undefined") {
      cpuModalVisibility(false); // FIXME необходимо обнуление ошибки
    }
  };

  deleteCpu = () => {
    const { deleteCpu, cpuModalVisibility, currentCpu } = this.props;
    deleteCpu({
      id_cpu: currentCpu.id,
    });
    cpuModalVisibility(false); // FIXME проверить на наличие ошибок
  };

  prevPage = () => {
    const { pagination, getCpus } = this.props;
    getCpus(pagination.current - 1);
  };

  nextPage = () => {
    const { pagination, getCpus } = this.props;
    getCpus(pagination.current + 1);
  };

  render() {
    const {
      cpus,
      pagination,
      isLoading,
      setCurrent,
      currentCpu,
      cpuVisibility,
    } = this.props;
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
        <CpusUI
          cpus={cpus}
          pagination={pagination}
          isLoading={isLoading}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          setCurrent={setCurrent}
          currentCpu={currentCpu}
          cpuVisibility={cpuVisibility}
          createDialog={this.createDialog}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

CpusContainer.propTypes = {
  getCpus: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  addCpu: PropTypes.func.isRequired,
  deleteCpu: PropTypes.func.isRequired,
  updateCpu: PropTypes.func.isRequired,
  cpuModalVisibility: PropTypes.func.isRequired,

  errorCode: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cpuVisibility: PropTypes.bool.isRequired,

  cpus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      model: PropTypes.string,
      socketCpu: PropTypes.string,
    })
  ).isRequired,
  currentCpu: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
  }).isRequired,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current: PropTypes.number,
    numPages: PropTypes.number,
    perPage: PropTypes.number,
  }).isRequired,
};

const mapSateToProps = (state) => ({
  cpus: state.cpu.cpus,
  pagination: state.cpu.pagination,
  currentCpu: state.cpu.currentCpu,
  isLoading: state.cpu.isLoading,
  errorCode: state.cpu.errorCode,
  cpuSocketVisibility: state.modalWindow.cpuSocketVisibility,
  cpuVisibility: state.modalWindow.cpuVisibility,
});

export default connect(mapSateToProps, {
  getCpus: getCpusData,
  setCurrent: setCurrentCpu,
  updateCpu: updateCpusData,
  deleteCpu: deleteCpusData,
  addCpu: addCpusData,
  setError,
  cpuSokevisibility: setCpuSoketVisibility,
  setVendorVisibility,
  setCurrentVendor,
  cpuModalVisibility: setCpuVisibility,
})(CpusContainer);
