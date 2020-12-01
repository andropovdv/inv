import React from 'react'
import './App.css';
import { connect } from 'react-redux';
import { initializeApp } from './BLL/appReducer'
import Preloader from './COMPONENT/Common/Preloader';
import Login from './COMPONENT/Login/Login';
import Header from './COMPONENT/Header/Header';
import Navbar from './COMPONENT/Navbar/Navbar';
import Footer from './COMPONENT/Footer/Footer';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }
    if (!this.props.isAuth) {
      return <Login />
    }

    return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <h1>Welcome</h1>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { initializeApp })(App);
