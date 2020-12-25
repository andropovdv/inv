import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../Utils/validators';
import { InputArea } from '../Common/FormsControls/FormsControls';
import s from '../Common/FormsControls/FormsControls.module.css'
import { connect } from 'react-redux';


let VendorReduxForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Краткое'} name={'name'} component={InputArea}
                    validate={[required]} autoFocus={true} />
            </div>
            <div>
                <Field placeholder={"Полное"} name={"full_name"} component={InputArea} />
            </div>
            <div>
                <Field placeholder={"url"} name={"url"} component={InputArea} />
            </div>
            {props.error && <div className={s.formSsummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Записать</button>
            </div>
        </form>
    );
};


VendorReduxForm = reduxForm({ form: 'vendor' })(VendorReduxForm);

VendorReduxForm = connect(state => ({ initialValues: state.vendor.currentVendor }), null)(VendorReduxForm);

export default VendorReduxForm;