import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({campuses, history}) => {
  const handleClick = () => {
    history.push('/campuses/create');
  }
  return (
    <section className='all-campuses-container'>
      <div className='all-campus-header'>
        <h2>All Campuses</h2>
        <button className='add-campus-btn' onClick={handleClick}>Add Campus</button>
      </div>
      
      <ul className='campus-list'>
        {
          campuses.map(campus => {

            return (
          
              <li key={campus.id} className='campus-list-item'>
                <img src={campus.imageUrl} className='campus-img' />

                <div className='campus-li-right'>
                  <div className='campus-li-info'>
                    <Link to={`/campuses/${campus.id}`}>
                      {campus.name}
                    </Link>
                    <h5>{
                        campus.students ? `${campus.students.length} Student(s) currently enrolled` : 'No students are enrolled yet'
                        }
                    </h5>
                  </div>
                  <div className='campus-li-tools'>
                    <Link to='#'>edit</Link>
                    <button className='campus-delete-btn' >delete</button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
export default connect((state) => (state))(Campuses)