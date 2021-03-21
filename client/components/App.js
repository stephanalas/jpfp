import React, { Component } from 'react';
import { connect } from 'react-redux';
import Campuses from './Campuses';
import { fetchCampuses, fetchStudents } from '../store';
import Nav from './Nav'
import { HashRouter, Switch, Route } from 'react-router-dom';
import Students from '../Students';

const Home = () => {
  return (
    <h1>Campus Directory</h1>
  )
}

class App extends Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <HashRouter>
        <Route  component={Nav}/>
        <Route path='/'  component={Home} exact/>
        <Route path='/campuses'  component={Campuses}/>
        <Route path='/students'  component={Students}/>
   
      </HashRouter>
      
    )
  }
}

const mapStateToProps =({ campuses}) => {
  return {
    campuses
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchCampuses())
      dispatch(fetchStudents())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);