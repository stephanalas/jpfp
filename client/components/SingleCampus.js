import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleCampus = ({campus, students }) => {

  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} />
      <h3>{campus.address}</h3>
      <p>{campus.description}</p>
      <h3>Students</h3>
      <ul>
        { students.length  ? students.map(student => <li key={student.id}><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></li> ) : 'No students are currentley enrolled'}
      </ul>
    </div>
    
  )
} 

export default connect((state,otherProps) => {
  const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id*1) || {};
  const students = state.students.filter(student => student.campusId === campus.id) || [];
  return {
    campus,
    students
  }
  return state
})(SingleCampus)