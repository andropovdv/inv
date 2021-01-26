import { Grid, Paper, Typography, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import VendorsDataGrid from './VendorsDataGrid';
import VendorDialog from './VendorDialog';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    buttonArea: {
        marginBottom: theme.spacing(2)
    }
}))


const VendorUI = (props) => {

    const classes = useStyles();
    const [header, setHeader] = React.useState('');
    const [action, setAction] = React.useState(false); // default: ADD VENDOR
    const [onDelete, setOnDelete] = React.useState(false);


    const clickAdd = () => {
        setOnDelete(false);
        setHeader('Добавление производителя:');
        setAction(false);
        props.createDialog(true)
    }
    const clickEdit = () => {
        setOnDelete(false);
        setHeader('Редактирование производителя:');
        setAction(true);
        props.createDialog(false)
    }

    const clickDelete = () => {
        setOnDelete(true)
        props.createDialog(false)
    }

    const closeModal = () => {
        props.setVendorVisibility(false)
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item={true} xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" align="left">Справочники:/ Производители</Typography>
                    </Paper>
                </Grid>
                <Grid item={true} xs={9}>
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch">
                            <Grid item={true}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className={classes.buttonArea}
                                    onClick={clickAdd}
                                >
                                    Добавить
                                    </Button>
                            </Grid>
                            <Grid item>
                                {/* <VendorTable
                                    {...props}
                                /> */}
                            </Grid>
                            <Grid item>
                                <VendorsDataGrid
                                    {...props}
                                    clickEdit={clickEdit}
                                    clickDelete={clickDelete}
                                    onSubmit={props.editVendor}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item={true} xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" align="left">
                            Информация
                        </Typography>
                        <Typography align="left">
                            {typeof props.currentVendor.id_vendor !== 'undefined'
                                ?
                                <div>
                                    <div>Сайт: {props.currentVendor.url}</div>
                                    <div>Сайт: {props.currentVendor.name}</div>
                                    <div>Сайт: {props.currentVendor.full_name}</div>
                                </div>
                                : null}

                        </Typography>

                    </Paper>
                </Grid>
            </Grid>

            <VendorDialog
                name={props.currentVendor.name}
                deleteVendor={props.deleteVendor}
                delete={onDelete}
                open={props.vendorVisibility}
                onClose={closeModal}
                header={header}
                onSubmit={action ? props.updateVendor : props.addVendor} />
        </>
    )
}

export default VendorUI;