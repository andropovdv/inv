import React from 'react';
import { connect } from 'react-redux';
import { logout } from './../../BLL/authReducer';

const UserStatus = (props) => {
    return (
        <div>
            {props.name} <button onClick={props.logout}>Logout</button> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.name
})

export default connect(mapStateToProps, { logout })(UserStatus);
