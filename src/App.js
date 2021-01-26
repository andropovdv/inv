import React from 'react'
// import './App.css';
import { connect } from 'react-redux';
import { initializeApp } from './BLL/appReducer'
import Preloader from './COMPONENT/Common/Preloader';
import Login from './COMPONENT/Login/Login';
import Header from './COMPONENT/Header/Header';
import Navbar from './COMPONENT/Navbar/Navbar';
import Footer from './COMPONENT/Footer/Footer';
import { Route } from 'react-router-dom';
import Cover from './COMPONENT/Cover/Cover';
import CpuSocketTypeContainer from './COMPONENT/CpuSocketType/CpuSocketTypeContainer';
import CpusContainer from './COMPONENT/Cpus/CpusContainer';
import VendorsContainer from './COMPONENT/Vendors/VendorsContainer';
import TypeOfRamContainer from './COMPONENT/TypeOfRam/TypeOfRamContainer';
import TypeOfGraphSlotContainer from './COMPONENT/TypeOfGraphSlot/TypeOfGraphSlotContainer';
import FormFactorContainer from './COMPONENT/FormFactor/FormFactorContainer';
import GraphCardContainer from './COMPONENT/GraphCard/GraphCardContainer';
import First from './COMPONENT/First';





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
      <div>
        <First/>
        {/* 
        <Header />
        <Node />
        <nav>
          <Navbar />
        </nav>
        <div className='app-wrapper-content'>
          <Route exact path='/' render={() => <Cover />} />
          <Route path='/Vendors' render={() => <VendorsContainer />} />
          <Route path='/Cpus' render={() => <CpusContainer />} />
          <Route path='/CpuSocket' render={() => <CpuSocketTypeContainer />} />
          <Route path='/TypeOfRam' render={() => <TypeOfRamContainer />} />
          <Route path='/TypeOfGraphSlot' render={() => <TypeOfGraphSlotContainer />} />
          <Route path='/FormFactor' render={() => <FormFactorContainer />} />
          <Route path='/GraphCard' render={() => <GraphCardContainer />} />
        </div>
        <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { initializeApp })(App);
