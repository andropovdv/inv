import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../Utils/validators';
import { InputArea } from '../Common/FormsControls/FormsControls';
import s from '../Common/FormsControls/FormsControls.module.css'


const VendorForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Краткое'} name={'name'} component={InputArea}
                    validate={[required]} defaultValue={props.currentVendorName} autoFocus={true}/>
            </div>
            <div>
                <Field placeholder={"Полное"} name={"full_name"} component={InputArea}
                    defaultValue={props.currentVendorFullName} />
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
export const VendorReduxForm = reduxForm({ form: 'vendor' })(VendorForm);