import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SmallStudentCard = ({student}) => {
  return (
    <li key={student.id} className='student-card'>
      <img src={student.imageUrl} className='student-img' />
      <section className='student-card-info'>
        <Link to={`/students/${ student.id }`}><h2>{ student.firstName } { student.lastName }</h2></Link>
        {/* <button onClick={() => destroy(student)} className='delete-btn'>delete</button> */}
      </section>
    </li>
  )
}

export default connect()(SmallStudentCard)