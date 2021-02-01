/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect } from "react-redux";
import { getAllFormFactor } from "../../../../BLL/formFactorReducer";

class FormFactorScroll extends React.Component {
  componentDidMount() {
    this.props.getAllFormFactor();
  }

  render() {
    const { input } = this.props;
    return (
      <span disabled={this.props.isLoading}>
        <select {...input}>
          <option>/</option>
          {this.props.allFormFactor.map((ff) => (
            <option key={ff.idFormFactor} value={ff.formFactor}>
              {ff.formFactor}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.formFactor.isLoading,
  allFormFactor: state.formFactor.allFormFactor,
});

export default connect(mapStateToProps, { getAllFormFactor })(FormFactorScroll);
