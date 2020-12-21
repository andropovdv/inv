import React from 'react'
import './App.css';
import { connect } from 'react-redux';
import { initializeApp } from './BLL/appReducer'
import Preloader from './COMPONENT/Common/Preloader';
import Login from './COMPONENT/Login/Login';
import Header from './COMPONENT/Header/Header';
import Navbar from './COMPONENT/Navbar/Navbar';
import Footer from './COMPONENT/Footer/Footer';
import { Route } from 'react-router-dom';
import Vendors from './COMPONENT/Vendors/Vendors';
import Cover from './COMPONENT/Cover/Cover';
import Cpus from './COMPONENT/Cpus/Cpus';
import CpuSocketTypeContainer from './COMPONENT/CpuSocketType/CpuSocketTypeContainer';

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
          <Route exact path='/' render = {() => <Cover />} />
          <Route path='/Vendors' render = {() => <Vendors />} />
          <Route path='/Cpus' render = {() => <Cpus />} />
          <Route path='/CpuSocket' render = {() => <CpuSocketTypeContainer />} />
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
