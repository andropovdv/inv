import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputArea } from '../Common/FormsControls/FormsControls';
// import s from './Cpus.module.css';
import { connect } from 'react-redux';
import VendorScrollContainer from '../Common/Scroll/VendorScroll/VendorScrollContainer';
import SocketCpuScrollContainer from '../Common/Scroll/SocketCpuScroll/SocketCpuScrollContainet';

const CpuForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'vendor'}
                        component={VendorScrollContainer} />
                    <button>+</button>
                </div>
                {/* <div>
                    <Field placeholder={'Производитель'} name={'vendor'}
                        component={InputArea} />
                </div> */}
                <div>
                    <Field placeholder={'Модель'} name={'model'}
                        component={InputArea} />
                </div>
                <Field name={'name_typeSocketCpu'}
                    component={SocketCpuScrollContainer} />
                <button onClick={() => alert('test')}>+</button>
                <div>
                    <button>Записать</button>
                </div>
            </form>
        </div>
    )
}

let CpuReduxForm = reduxForm({ form: 'cpu' })(CpuForm);

CpuReduxForm = connect(state => ({ initialValues: state.cpu.currentCpu }), null)(CpuReduxForm)

export default CpuReduxForm;