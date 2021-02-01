/* eslint-disable import/no-mutable-exports */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { InputArea } from "../Common/FormsControls/FormsControls";
// import s from './Cpus.module.css';
import VendorScrollContainer from "../Common/Scroll/VendorScroll/VendorScrollContainer";
import SocketCpuScrollContainer from "../Common/Scroll/SocketCpuScroll/SocketCpuScrollContainer";

const CpuForm = (props) => {
  const addCpuSocket = (e) => {
    e.preventDefault();

    props.setCpuSoketVisibility(true);
  };

  const addVendor = (e) => {
    e.preventDefault();
    props.setCurrentVendor(null, null, null);
    props.setVendorVisibility(true);
  };
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name="vendor" component={VendorScrollContainer} />
          <button type="button" onClick={(e) => addVendor(e)}>
            +
          </button>
        </div>
        {/* <div>
                    <Field placeholder={'Производитель'} name={'vendor'}
                        component={InputArea} />
                </div> */}
        <div>
          <Field placeholder="Модель" name="model" component={InputArea} />
        </div>
        <Field name="name_typeSocketCpu" component={SocketCpuScrollContainer} />
        <button type="button" onClick={(e) => addCpuSocket(e)}>
          +
        </button>
        <div>
          <button type="button">Записать</button>
        </div>
      </form>
    </div>
  );
};

let CpuReduxForm = reduxForm({ form: "cpu", enableReinitialize: true })(
  CpuForm
);

CpuReduxForm = connect(
  (state) => ({ initialValues: state.cpu.currentCpu }),
  null
)(CpuReduxForm);

export default CpuReduxForm;
