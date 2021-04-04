import React, { Component } from "react";
import { connect } from "react-redux";
import thunks from "../store/thunks/index";
import { HashRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import AllCampuses from "./campus/AllCampuses";
import SingleCampus from "./campus/SingleCampus";
import AddCampusForm from "./campus/forms/AddCampusForm";
import UpdateCampus from "./campus/UpdateCampus";
import Students from "./student/AllStudents";
import SingleStudent from "./student/SingleStudent";
import AddStudentForm from "./student/forms/AddStudentForm";
import UpdateStudentForm from "./student/forms/UpdateStudentForm";

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <HashRouter>
        <Route component={Nav} />
        <Route path="/" component={AllCampuses} exact />
        <Route path="/campuses" exact component={AllCampuses} />
        <Route path="/students" component={Students} exact />
        <Switch>
          <Route path="/campuses/update/:id" component={UpdateCampus} />
          <Route path="/students/update/:id" component={UpdateStudentForm} />
          <Route path="/students/create" exact component={AddStudentForm} />
          <Route path="/campuses/create" exact component={AddCampusForm} />
          <Route path="/campuses/:id" exact component={SingleCampus} />
          <Route path="/students/:id" component={SingleStudent} />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect(
  (state) => state,
  (dispatch) => {
    const { campus, student } = thunks;
    return {
      load: () => {
        dispatch(campus.fetchCampuses());
        dispatch(student.fetchStudents());
      },
    };
  }
)(App);
