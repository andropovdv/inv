import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputArea } from '../Common/FormsControls/FormsControls';
// import s from './Cpus.module.css';
import { connect } from 'react-redux';
import VendorScrollContainer from '../Common/Scroll/VendorScroll/VendorScrollContainer';
import SocketCpuScrollContainer from '../Common/Scroll/SocketCpuScroll/SocketCpuScrollContainer';

const CpuForm = (props) => {

    const addCpuSocket = (e) => {
        e.preventDefault();

        props.setCpuSoketVisibility(true)
    }

    const addVendor = (e) => {
        e.preventDefault();
        props.setCurrentVendor(null, null, null)
        props.setVendorVisibility(true)
    } 
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'vendor'}
                        component={VendorScrollContainer} />
                    <button onClick={(e) => addVendor(e)}>+</button>
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
                <button onClick={(e) => addCpuSocket(e)}>+</button>
                <div>
                    <button>Записать</button>
                </div>
            </form>
        </div>
    )
}

let CpuReduxForm = reduxForm({ form: 'cpu', enableReinitialize: true })(CpuForm);

CpuReduxForm = connect(state => ({ initialValues: state.cpu.currentCpu }), null)(CpuReduxForm)

export default CpuReduxForm;