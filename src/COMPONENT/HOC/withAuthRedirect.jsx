/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
    }

    render() {
      const { isAuth } = this.props;

      if (!isAuth) {
        return <Redirect to="/Login" />;
      }
      return <Component {...this.props} />;
    }
  }

  RedirectComponent.propTypes = {
    isAuth: PropTypes.bool.isRequired,
  };

  const ConnectedAuthRedirect = connect(
    mapStateToProps,
    null
  )(RedirectComponent);

  return ConnectedAuthRedirect;
};

export default withAuthRedirect;
