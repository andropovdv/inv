import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputArea } from '../../FormsControls/FormsControls';

const FormFactorForm = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'formFactor'} placeholder={'Наименование'}
                        component={InputArea} autoFocus={true} />
                </div>
                <div>
                    <button>Записать</button>
                </div>
            </form>
        </>
    )
}

let FormFactorReduxForm = reduxForm({ form: 'formFactor' })(FormFactorForm);

FormFactorReduxForm = connect(state => ({
    initialValues: state.formFactor.currentType
}))(FormFactorReduxForm);

export default FormFactorReduxForm;
