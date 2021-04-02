import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllCampuses from './AllCampuses';
import { fetchCampusesThunk, fetchStudentsThunk } from '../store';
import Nav from './Nav'
import { HashRouter, Switch, Route } from 'react-router-dom';
import Students from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampusForm from './AddCampusForm';
import AddStudentForm from './AddStudentForm';
import UpdateCampus from './UpdateCampus';
import UpdateStudentForm from './UpdateStudentForm';

class App extends Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <HashRouter>
        <Route  component={Nav}/>
        <Route path='/'  component={AllCampuses} exact/>
        <Route path='/campuses' exact component={AllCampuses}/>
        <Route path='/students'  component={Students} exact/>
        <Switch>
          <Route path='/campuses/update/:id' component={UpdateCampus} />
          <Route path='/students/update/:id' component={UpdateStudentForm} />
          <Route path='/students/create' exact component={AddStudentForm} />
          <Route path='/campuses/create' exact component={AddCampusForm} />
          <Route path='/campuses/:id' exact component={SingleCampus} />
          <Route path='/students/:id' component={SingleStudent} />
        </Switch>
   
      </HashRouter>
      
    )
  }
}


export default connect(state => state, (dispatch) => {
  return {
    load: () => {
      dispatch(fetchCampusesThunk())
      dispatch(fetchStudentsThunk())
    }
  }
})(App);