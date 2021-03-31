import React from 'react';
import { connect } from 'react-redux';
import { destroyStudent } from '../store';
import StudentCard from './StudentCard';

const Students = ({ students, history, destroy}) => {

  if (students.length === 0) {
    return (
      <section className='no-view'>
        <h1>All Students</h1>
        <p>There are no students registered in the database</p>
        <button className='add-btn' onClick={() => history.push('/students/create')}>Add Student</button>
      </section>
    )
  }
  return (
    <main className='all-students-view'>
      <div className='all-students-header'>
        <h1>All Students</h1>
        <button className='add-btn' onClick={ () => history.push('/students/create') }>Add Student</button>
      </div>
      <ul className='student-list'>
        {
          students.map(student => <StudentCard key={student.id} destroy={destroy} student={student} />)
        }
      </ul>
    </main>
  )
}
export default connect(state => state, (dispatch) => {
  return {
    destroy : (student) =>{
      dispatch(destroyStudent(student))
    }  
  }
})(Students)