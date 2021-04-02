import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateCampusForm from './forms/UpdateCampusForm';
import StudentRow from '../student/StudentRow';
import AddStudentCampusForm from './forms/AddStudentCampusForm';

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className='update-view' id='update-campus-view'>
        
        <h1>Update campus</h1>
        <UpdateCampusForm campus={this.props.campus} history={this.props.history} />
        <h2>Students on Campus</h2>
        <AddStudentCampusForm students={this.props.students} campus={this.props.campus} />
        <ul className='edit-students-on-campus'>
            {
             Object.keys(this.props.campus).includes('students') ? this.props.campus.students.map(student => <StudentRow key={student.id * 10} student={student} />) : 'No Students '
            }
        </ul>
      </main>
    )
  }
}

export default connect((state, { match, history } ) => {
  
  const campus = state.campuses.find(campus => campus.id === match.params.id*1) || {}
  const students = state.students || [];
  return {
    campus,
    students,
    history
  }
})(UpdateCampus);