import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyStudent } from '../store'
const Students = ({ students, history, destroy}) => {

  if (students.length === 0) {
    return (
      <main className='no-view'>
        <h1>All Students</h1>
        <p>There are no students registered in the database</p>
        <button className='add-btn' onClick={() => history.push('/students/create')}>Add Student</button>
      </main>
    )
  }
  return (
    <section className='all-students-container'>
      <div className='all-students-header'>
        <h2>All Students</h2>
        <button className='add-btn' onClick={ () => history.push('/students/create') }>Add Student</button>
      </div>
      <ul className='student-list'>
        {
          students.map(student => {

            return (
              <li key={student.id} className='student-li'>
                <img src={student.imageUrl}/>
                <Link to={`/students/${ student.id }`}>{ student.firstName } { student.lastName }</Link>
                { student.campus ? <span>Attending:  <Link to={`/campuses/${ student.campus.id }`} >{ student.campus.name }</Link> </span> : 'Currently not attending a campus'}
                <button onClick={() => destroy(student)}>delete</button>
              </li>
            );
          })
        }
      </ul>
    </section>
  )
}
export default connect(state => state, (dispatch) => {
  return {
    destroy : (student) =>{
      dispatch(destroyStudent(student))
    }  
  }
})(Students)