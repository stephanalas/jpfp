import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { unregisterStudent } from '../store';
const SingleCampus = ({campus, students, unregister }) => {

  return (
    <main className='single-campus-view'>
      <section className='single-campus-info'>
        <div className='image-with-info'>
          <section>
            <img src={campus.imageUrl} className='campus-img' /> 
          </section>
          <section className='single-campus-name-bio'>
            <h1>{campus.name}</h1>
            <p className='campus-description'>{campus.description}</p>
          </section>
        </div>
        <section className='tools'>
        <h3>{campus.address}</h3>

        </section>
      </section>
      
      <section className='students-on-campus'>

      </section>

      <h3>Students</h3>
      <ul>
        { students.length  ? students.map(student => <li key={student.id}><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link><button onClick={() => unregister(student.id) }>Unregister</button></li> ) : 'No students are currentley enrolled'}
      </ul>
    </main>
    
  )
} 

export default connect((state,otherProps) => {
  const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id*1) || {};
  const students = state.students.filter(student => student.campusId === campus.id) || [];
  return {
    campus,
    students
  }
}, (dispatch) => {
  return {
    unregister: (id) => dispatch(unregisterStudent(id))
  }
})(SingleCampus)