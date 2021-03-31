import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { unregisterStudent } from '../store';
const StudentRow = ({student, unregister}) => {
  return (
    <section className='student-row'>
      <img src={student.imageUrl} />
      <div className='student-row-name'>
        <Link to={`/students/${student.id}`}>{student.name}</Link>
      </div>
      <div className='student-row-btn'>
        <button onClick={()=>unregister(student.id)}>remove from campus</button>
      </div>
    </section>
  )
}

export default connect(null, (dispatch) => {
  return {
    unregister: (id) => dispatch(unregisterStudent(id))
  }
})(StudentRow)