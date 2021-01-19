import { Button, FormControl, FormHelperText } from '@material-ui/core';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, email } from '../../Utils/validators';
import { InputArea, InputAreaMaterial } from '../Common/FormsControls/FormsControls';
import s from '../Common/FormsControls/FormsControls.module.css'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 265
    }
}))



const LoginForm = (props) => {
    const classes = useStyles();
    const { pristine, submitting } = props;

    return (
        <form onSubmit={props.handleSubmit} className={classes.form} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
                <div>
                    <Field placeholder={'e-mail'} name={'email'} component={InputAreaMaterial}
                        label="Email" validate={[required, email]}/>
                </div>
                {/* <div>
                    <Field placeholder={'e-mail'} name={'email'} component={InputArea}
                        validate={[required, email]} />
                </div> */}
                <div>
                    <Field placeholder={"Password"} name={"pass"} component={InputAreaMaterial}
                        type={"password"} validate={[required]} label="Password"/>
                </div>
                {/* <div>
                    <Field placeholder={"password"} name={"pass"} component={InputArea}
                        type={"password"} validate={[required]} />
                </div> */}
                {props.error &&
                    <FormHelperText error="true">{props.error}</FormHelperText>
                }
                {/* {props.error && 
                <div className={s.formSsummaryError}>
                    {props.error}
                </div>} */}

                <Button
                    type="submit"
                    disabled={pristine || submitting}
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
                {/* <Button
                    type="button"
                    disabled={pristine || submitting}
                    color="primary"
                    onClick={reset}
                >
                    Clear
                        </Button> */}
            </FormControl>
        </form>
    );
};
export const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);
