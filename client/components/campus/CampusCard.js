import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CampusCard = ({ campus, destroy }) => {

  return (
    <li key={campus.id} className='campus-card'>
    <img src={campus.imageUrl} className='campus-img' />

    <section className='campus-card-info'>
      <div className='campus-card-info-name'>
        <Link to={`/campuses/${campus.id}`}>
          <h2>{campus.name}</h2>
        </Link>
        <h5>{
            Object.keys(campus).includes('students') ? `${campus.students.length} Student(s) currently enrolled` : 'No students are enrolled yet'
            }
        </h5>
      </div>
      <div className='campus-card-tools'>
        <Link to={`/campuses/update/${campus.id}`}>edit</Link>
        <button className='delete-btn' onClick={() => destroy(campus)} >delete</button>
      </div>
    </section>
    </li>
  )
};

export default connect(null)(CampusCard)