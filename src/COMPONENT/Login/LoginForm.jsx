import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, email } from '../../Utils/validators';
import { InputArea } from '../Common/FormsControls/FormsControls';
import s from '../Common/FormsControls/FormsControls.module.css'


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'e-mail'} name={'email'} component={InputArea}
                    validate={[required, email]} />
            </div>
            <div>
                <Field placeholder={"password"} name={"pass"} component={InputArea}
                    type={"password"} validate={[required]} />
            </div>
            {props.error && <div className={s.formSsummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);
