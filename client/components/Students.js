import React from 'react';
import { connect } from 'react-redux';


const Students = ({ students }) => {
  return (
    <div className='all-students-container'>
      <h2>All Students</h2>
      <ul className='student-list'>
        {
          students.map(student => {
            return (
              <li key={student.id}>
                {student.firstName} {student.lastName}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default connect((students) => (students))(Students)