/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import {
  getTypeOfGraphSlot,
  setCurrentTypeOfGraph,
  deleteTypeOfGraphSlot,
} from "../../BLL/typeOfGraphSlotReducer";
import TypeOfGraphSlot from "./TypeOfGraphSlot";
import { setTypeOfGraphSlotVisibility } from "../../BLL/modalWindowReducer";

class TypeOfGraphSlotContainer extends React.Component {
  componentDidMount() {
    this.props.getTypeOfGraphSlot();
  }

  createModal = (flag) => {
    if (flag) {
      this.props.setCurrentTypeOfGraph(null, null);
      this.props.setTypeOfGraphSlotVisibility(true);
    } else {
      this.props.setTypeOfGraphSlotVisibility(true);
    }
  };

  deleteTypeOfGraphSlot = () => {
    const res = window.confirm(
      `Вы действительно хотите удалить ${this.props.currentType.typeOfGraphSlot}`
    );
    if (res) {
      this.props.deleteTypeOfGraphSlot(
        this.props.currentType.idTypeOfGraphSlot
      );
    }
  };

  prevPage = () => {
    this.props.getTypeOfGraphSlot(this.props.pagination.current - 1);
  };

  nextPage = () => {
    this.props.getTypeOfGraphSlot(this.props.pagination.current + 1);
  };

  render() {
    return (
      <TypeOfGraphSlot
        {...this.props}
        createModal={this.createModal}
        delete={this.deleteTypeOfGraphSlot}
        prevPage={this.prevPage}
        nextPage={this.nextPage}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  typeOfGraphSlot: state.typeOfGraphSlot.typeOfGraphSlot,
  typeAllGraphSlot: state.typeOfGraphSlot.typeAllOfGraphSlot,
  pagination: state.typeOfGraphSlot.pagination,
  currentType: state.typeOfGraphSlot.currentType,
  isLoading: state.typeOfGraphSlot.isLoading,
  errorCode: state.typeOfGraphSlot.errorCode,
  typeOfGraphSlotVisibility: state.modalWindow.typeOfGraphSlotVisibility,
});

export default connect(mapStateToProps, {
  getTypeOfGraphSlot,
  setTypeOfGraphSlotVisibility,
  setCurrentTypeOfGraph,
  deleteTypeOfGraphSlot,
})(TypeOfGraphSlotContainer);
