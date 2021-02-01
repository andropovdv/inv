import { Button } from "@material-ui/core";
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../BLL/authReducer";

const UserStatus = (props) => {
  const { name, isLogout } = props;
  return (
    <div>
      {name}
      <Button variant="outlined" color="inherit" onClick={isLogout}>
        Logout
      </Button>
    </div>
  );
};

UserStatus.propTypes = {
  name: PropTypes.string.isRequired,
  isLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  name: state.auth.name,
});

export default connect(mapStateToProps, { isLogout: logout })(UserStatus);
