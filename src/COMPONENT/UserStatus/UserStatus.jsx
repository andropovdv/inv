import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from './../../BLL/authReducer';

const UserStatus = (props) => {
    return (
        <div>
            {props.name} <Button variant="outlined" color="inherit" onClick={props.logout}>Logout</Button> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.name
})

export default connect(mapStateToProps, { logout })(UserStatus);
