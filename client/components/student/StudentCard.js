import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentCard = ({student, destroy}) => {
  return (
    <li key={student.id} className='student-card'>
      <img src={student.imageUrl} className='student-img' />
      <section className='student-card-info'>
        <Link to={`/students/${ student.id }`}><h2>{ student.firstName } { student.lastName }</h2></Link>

          { 
            student.campus ? <span>  
            <Link to={`/campuses/${ student.campus.id }`} >{ student.campus.name }</Link> </span> 
              : <p>Currently not attending a campus</p>
          }
        
        {/* <button onClick={() => destroy(student)} className='delete-btn'>delete</button> */}
      </section>
    </li>
  )
}

export default connect()(StudentCard)