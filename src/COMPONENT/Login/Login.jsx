import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './Login.module.css';

const Login = () => {
    return (
        <div>
            <div className={s.modal}>
                LOGIN
                <LoginReduxForm />
            </div>
            <div className={s.bg}></div>
        </div>
    )
}

export default Login;


const LoginForm = (props) => {
    return (
        <form>
            <div>
                <Field placeholder={'e-mail'} name={'email'} component={"input"} />
            </div>
            <div>
                <Field placeholder={"password"} name={"password"} component={"input"}
                    type={"password"} />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)