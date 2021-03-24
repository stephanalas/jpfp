import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = (props) => {
  console.log(props)
  const {students} = props
  return (
    <section className='all-students-container'>
      <div className='all-students-header'>
        <h2>All Students</h2>
        <button className='add-student-btn' onClick={() => props.history.push('/students/create')}>Add Student</button>
      </div>
      <ul className='student-list'>
        {
          students.map(student => {
            return (
              <li key={student.id} className='student-li'>
                <img src={student.imageUrl}/>
                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                { student.campus ? <span>Attending:  <Link to={`/campuses/${student.campus.id}`} >{student.campus.name}</Link> </span> : 'Currently not attending a campus'}
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
export default connect((state) => (state))(Students)