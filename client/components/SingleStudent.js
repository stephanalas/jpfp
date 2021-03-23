import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleStudent = ({student, campus}) => {
  return (
    <div>
      <h1>Student Info</h1>
      <ul>
        <img src={`${student.imageUrl}`} />
        <li>Name: {student.firstName} {student.lastName}</li>
        <li>GPA: {student.gpa}</li>
        <li>Email: {student.email}</li>
        <li>Campus: { campus.id ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'Not currently attending a campus'}</li>
      </ul>
    </div>

    
  )
} 

export default connect((state,otherProps) => {
  const student = state.students.find(student => student.id === otherProps.match.params.id*1) || {};
  const campus = state.campuses.find(campus => campus.id === student.campusId) || {};
  return {
    student,
    campus
  }
})(SingleStudent)