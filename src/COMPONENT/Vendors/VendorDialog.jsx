import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Field, reduxForm } from 'redux-form';
import { InputAreaOutlined } from '../Common/FormsControls/FormsControls';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 265,
        width: 'fit-content'
    }
}))

let VendorDialog = (props) => {

    const classes = useStyles();


    return (
        <Container>
            {props.delete ? (
                <Dialog open={props.open} onClose={props.onClose} modal="true">
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogContent>
                        Вы уверенны в том, что хотите удалить <b>{props.name}</b> ?
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={props.onClose}>Отмена</Button>
                        <Button color="secondary" onClick={props.deleteVendor}>Удалить</Button>
                    </DialogActions>
                </Dialog>
            )
                : (
                    <Dialog open={props.open} onClose={props.onClose} modal="true">
                        <form onSubmit={props.handleSubmit} className={classes.form}>
                            <DialogTitle>{props.header}</DialogTitle>
                            <DialogContent>
                                <div>
                                    <Field name={"name"} placeholder={'name'} component={InputAreaOutlined} autoFocus />
                                </div>
                                <div>
                                    <Field name={'full_name'} placeholder={'full name'} component={InputAreaOutlined} />
                                </div>
                                <div>
                                    <Field name={'url'} placeholder={'url'} component={InputAreaOutlined} />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button type="button" onClick={props.onClose} color='primary'>Cancel</Button>
                                <Button type="submit" color='primary'>Save</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                )}
        </Container>
    )
}

VendorDialog = reduxForm({ form: 'vendor', enableReinitialize: true })(VendorDialog);

VendorDialog = connect(state => ({ initialValues: state.vendor.currentVendor }), null)(VendorDialog)

export default VendorDialog;