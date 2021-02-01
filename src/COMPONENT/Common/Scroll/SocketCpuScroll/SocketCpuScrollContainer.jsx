/* eslint-disable react/jsx-props-no-spreading */
// FIXME разберись с пропсами {...input}
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAllSocketCpuData } from "../../../../BLL/typeSocketCpuReducer";

class SocketCpuScrollContainer extends React.Component {
  componentDidMount() {
    const { getAll } = this.props;
    getAll();
  }

  render() {
    const { isLoading, cpuSocketsAll, input } = this.props;
    return (
      <span disabled={isLoading}>
        <select {...input}>
          <option>/</option>
          {cpuSocketsAll.map((s) => (
            <option key={s.id_typeSocketCpu} value={s.name_typeSocketCpu}>
              {s.name_typeSocketCpu}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

SocketCpuScrollContainer.propTypes = {
  getAll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cpuSocketsAll: PropTypes.shape([]).isRequired,
  input: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  cpuSocketsAll: state.typeCpuSocket.cpuSocketsAll,
  isLoading: state.typeCpuSocket.isLoading,
});

export default connect(mapStateToProps, { getAll: getAllSocketCpuData })(
  SocketCpuScrollContainer
);
