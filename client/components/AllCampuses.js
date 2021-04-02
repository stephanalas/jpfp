import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyCampusThunk, fetchCampusesThunk} from '../store';
import CampusCard from './CampusCard';


class AllCampuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campuses: props.campuses
    }
  }
  componentDidMount() {
    this.props.load();
  }

  render() {

    const { history, campuses, destroy } = this.props
    const create = () => {
      history.push('/campuses/create');
    };
    if (campuses.length === 0) {
      return (
        <main className='no-view'>
          <h1>All Campuses</h1>
          <p>There are no campuses registered in the database</p>
          <button className='add-btn' onClick={create}>Add Campus</button>
        </main>
      )
    }
    return (
      <main id='all-campuses-view'>
        <div className='all-campus-header'>
          <h1>All Campuses</h1>
          <button className='add-btn' onClick={create}>Add Campus</button>
        </div>
       
        <ul className='campus-list'>
          {
            campuses.map(campus => <CampusCard key={campus.id} destroy={destroy} campus={campus} />)
          }
        </ul>
      </main>
    )
  };
}

export default connect(({campuses}) => ({campuses}), (dispatch) => {
  return {
    load : () => {
      dispatch(fetchCampusesThunk())
    },
    destroy: (campus) => {
      dispatch(destroyCampusThunk(campus));
    }

  }
})(AllCampuses)