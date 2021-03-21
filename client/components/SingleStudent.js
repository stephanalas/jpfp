import React from 'react';
import { connect } from 'react-redux';

const SingleStudent = ({student, campus}) => {
  console.log(student)
  console.log(campus)
  return (
    <div>
      <h1>Student Info</h1>
      
      {/* <img src={campus.imageUrl} />
      <h3>{campus.address}</h3>
      <p>{campus.description}</p>
      <h3>Students</h3>
      <ul>
        { students.length  ? students.map(student => <li>{student.firstName} {student.lastName}</li>) : 'No students are currentley enrolled'}
      </ul> */}
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