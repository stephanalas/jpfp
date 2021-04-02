import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import thunks from '../../store/thunks';
const StudentRow = ({student, unregister}) => {
  return (
    <li className='student-row'>
      <img src={student.imageUrl} className='student-img'/>
      <div>
        <div className='student-row-name'>
          <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
        </div>
        <div className='student-row-btn'>
          <button className='delete-btn' onClick={()=>unregister(student.id, student.campusId)}>remove from campus</button>
        </div>
      </div>
    </li>
  )
}

export default connect(null, (dispatch) => {
  const { unregisterStudent } = thunks.student;
  return {
    unregister: (id, campusId) => dispatch(unregisterStudent(id, campusId))
  }
})(StudentRow)