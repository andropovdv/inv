import React from 'react';
import s from './Login.module.css';
import { connect } from 'react-redux';
import { LoginReduxForm } from './LoginForm';
import { login } from '../../BLL/authReducer';

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.pass);
    }

    return (
        <div>
            <div className={s.modal}>
                LOGIN
                <LoginReduxForm onSubmit={onSubmit} />
            </div>
            <div className={s.bg}></div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)


