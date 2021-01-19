import React from 'react';
import { connect } from 'react-redux';
import { getAllSocketCpuData } from '../../../../BLL/typeSocketCpuReducer';

class SocketCpuScrollContainer extends React.Component {

    componentDidMount() {
        this.props.getAllSocketCpuData();
    }


    render() {
        const { input } = this.props;
        return (
            <span disabled={this.props.isLoading}>
                <select {...input}>
                    <option>/</option>
                    {this.props.cpuSocketsAll.map(s =>
                        <option key={s.id_typeSocketCpu} value={s.name_typeSocketCpu}>{s.name_typeSocketCpu}</option>)}
                </select>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    cpuSocketsAll: state.typeCpuSocket.cpuSocketsAll,
    isLoading: state.typeCpuSocket.isLoading
})

export default connect(mapStateToProps, { getAllSocketCpuData })(SocketCpuScrollContainer)
