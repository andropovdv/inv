/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-const-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { InputArea } from "../Common/FormsControls/FormsControls";

const CpuSocketForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            name="name_typeSocketCpu"
            placeholder="Наименование"
            component={InputArea}
          />
        </div>
        <div>
          <button type="button">Записать</button>
        </div>
      </form>
    </div>
  );
};

let CpuSocketReduxForm = reduxForm({ form: "cpuSocket" })(CpuSocketForm);

CpuSocketReduxForm = connect(
  (state) => ({ initialValues: state.typeCpuSocket.currentType }),
  null
)(CpuSocketReduxForm);

export default CpuSocketReduxForm;
