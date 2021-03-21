import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampus } from '../store'

const Campuses = (props) => {
  return (
    <div className='all-campuses-container'>
      <h2>All Campuses</h2>
      <ul className='campus-list'>
        {
          props.campuses.map(campus => {
            return (
              
              <li key={campus.id}>
                <Link to={`/campuses/${campus.id}`} onClick={() => props.loadCampus(campus.id)}>
                  <img src={campus.imageUrl} />
                  {campus.name}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default connect(({campuses}) => ({campuses}), (dispatch) => {
  return {
    loadCampus: (id) => dispatch(fetchCampus(id))
  }
})(Campuses)