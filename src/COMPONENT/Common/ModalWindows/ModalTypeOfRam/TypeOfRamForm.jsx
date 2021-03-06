/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable react/button-has-type */
import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { InputArea } from "../../FormsControls/FormsControls";

const TypeOfRamForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            name="typeOfRam"
            placeholder="Наименование"
            component={InputArea}
            autoFocus
          />
        </div>
        <div>
          <button>Записать</button>
        </div>
      </form>
    </>
  );
};

let TypeOfRamReduxForm = reduxForm({ form: "typeOfRam" })(TypeOfRamForm);

TypeOfRamReduxForm = connect(
  (state) => ({
    initialValues: state.typeOfRam.currentType,
  }),
  null
)(TypeOfRamReduxForm);

export default TypeOfRamReduxForm;
