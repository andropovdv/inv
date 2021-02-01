/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import { getGraphCard, setCurrentGraphCard } from "../../BLL/graphCardReducer";
import GraphCard from "./GraphCard";
import { setGraphCardVisibility } from "../../BLL/modalWindowReducer";

class GraphCardContainer extends React.Component {
  componentDidMount() {
    this.props.getGraphCard();
  }

  createModal = (toggle) => {
    if (toggle) {
      this.props.setCurrentGraphCard(null, null, null, null, null);
      this.props.setGraphCardVisibility(true);
    } else {
      this.props.setGraphCardVisibility(true);
    }
  };

  render() {
    return <GraphCard {...this.props} createModal={this.createModal} />;
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.graphCard.isLoading,
  graphCard: state.graphCard.graphCard,
  pagination: state.graphCard.pagination,
  currentRow: state.graphCard.currentRow,
  graphCardVisibility: state.modalWindow.graphCardVisibility,
});

export default connect(mapStateToProps, {
  getGraphCard,
  setCurrentGraphCard,
  setGraphCardVisibility,
})(GraphCardContainer);
