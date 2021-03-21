import React from 'react';
import { connect } from 'react-redux';


const Campuses = ({ campuses }) => {
  return (
    <div className='all-campuses-container'>
      <h2>All Campuses</h2>
      <ul className='campus-list'>
        {
          campuses.map(campus => {
            return (
              
              <li key={campus.id}>
                <img src={campus.imageUrl} />
                {campus.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default connect(({campuses}) => ({campuses}))(Campuses)