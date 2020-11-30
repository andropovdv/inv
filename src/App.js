import React from 'react'
import './App.css';
import { connect } from 'react-redux';
import { initializeApp } from './BLL/appReducer'
import Preloader from './COMPONENT/Common/Preloader';
import Login from './COMPONENT/Login/Login';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    
    if (!this.props.initialized) {
      return <Preloader />
    }
    debugger
    if (this.props.isAuth) {
      return <div>Залогиненен</div>
    }

    return (
      <div>
        <Login/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { initializeApp })(App);
