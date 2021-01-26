import React from 'react';
import { connect } from 'react-redux';
import { LoginReduxForm } from './LoginForm';
import { login } from '../../BLL/authReducer';
import { makeStyles } from '@material-ui/core/styles'
import {
    Container, Dialog, DialogContent, DialogTitle
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        mardinTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'colunm',
        alignItem: 'center'
    },
    avatar: {

    },
    form: {

    },
    submit: {

    }
}))


const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.pass);
    }

    const [open, setOpen] = React.useState(true)

    const handleClose = () => {
        setOpen(false);
    }

    const classes = useStyles();

    return (
        <Container component="main" minWidth="xs">
            <Dialog open={!props.isAuth}>
                <DialogTitle>Вход в систему</DialogTitle>
                <DialogContent>
                    <LoginReduxForm onSubmit={onSubmit} />
                </DialogContent>
            </Dialog>
        </Container>


        // <div>
        //     <div className={s.modal}>
        //         LOGIN
        //         <LoginReduxForm onSubmit={onSubmit} />
        //     </div>
        //     <div className={s.bg}></div>
        // </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)


