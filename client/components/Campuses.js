import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyCampus, fetchCampuses} from '../store';

class Campuses extends Component {
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

    const { history, campuses, destroy, load } = this.props
    const create = () => {
      history.push('/campuses/create');
    };
    return (
      <section className='all-campuses-container'>
        <div className='all-campus-header'>
          <h2>All Campuses</h2>
          <button className='add-btn' onClick={create}>Add Campus</button>
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
                          Object.keys(campus).includes('students') ? `${campus.students.length} Student(s) currently enrolled` : 'No students are enrolled yet'
                          }
                      </h5>
                    </div>
                    <div className='campus-li-tools'>
                      <Link to={`/campuses/update/${campus.id}`}>edit</Link>
                      <button className='delete-btn' onClick={() => destroy(campus)} >delete</button>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </section>
    );
  };
}

export default connect(({campuses}) => ({campuses}), (dispatch) => {
  return {
    load : () => {
      dispatch(fetchCampuses())
    },
    destroy: (campus) => {
      dispatch(destroyCampus(campus));
    }

  }
})(Campuses)