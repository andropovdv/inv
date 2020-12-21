import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputArea } from '../Common/FormsControls/FormsControls';
import { connect } from 'react-redux';

const CpuSocketForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'name_typeSocketCpu'} placeholder={'Наименование'} component={InputArea} />
                </div>
                <div>
                    <button>Записать</button>
                </div>
            </form>
        </div>
    )
}

let CpuSocketReduxForm = reduxForm({ form: 'cpuSocket' })(CpuSocketForm);

CpuSocketReduxForm = connect(state => (
    { initialValues: state.typeCpuSocket.currentType }), null)(CpuSocketReduxForm);

export default CpuSocketReduxForm; 
