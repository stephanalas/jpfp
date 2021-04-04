import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import thunks from '../../store/thunks/index'
import CampusCard from './CampusCard';


const AllCampuses = ({campuses, destroy, history }) => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunks.campus.fetchCampuses())
  }, [dispatch])

    if (campuses.length === 0) {
      return (
        <main className='no-view'>
          <h1>All Campuses</h1>
          <p>There are no campuses registered in the database</p>
          <button className='add-btn' onClick={() => history.push('/campuses/create')}>Add Campus</button>
        </main>
      )
    }
    return (
      <main id='all-campuses-view'>
        <div className='all-campus-header'>
          <h1>All Campuses</h1>
          <button className='add-btn' onClick={() => history.push('/campuses/create')}>Add Campus</button>
        </div>
       
        <ul className='campus-list'>
          {
            campuses.map(campus => <CampusCard key={campus.id} destroy={destroy} campus={campus} />)
          }
        </ul>
      </main>
    )
};

export default connect(({campuses}, { history }) => ({campuses, history}), (dispatch, {history}) => {
  const { destroyCampus, fetchCampuses } = thunks.campus 
  return {
    load : () => {
      dispatch(fetchCampuses())
    },
    destroy: (campus) => {
      dispatch(destroyCampus(campus, history));
    }

  }
})(AllCampuses)