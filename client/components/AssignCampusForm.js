import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerStudentThunk } from '../store';

class AssignCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  render() {
    return (
      <form>
        <select>
          <option>Select Campus</option>
          {
            this.props.campuses.map(campus => <option>{campus.name}</option>)
          }
        </select>
        {
          this.props.student.campus ? <button className='add-btn'>Change Campus</button> : <button className='add-btn'>Add to campus</button>
        }
      </form>
    )
  }
}

export default connect(state => {
  const { campuses } = state;
  return {
    campuses
  }
}, (dispatch) => {
  return {
    register: (id, campusId) => dispatch(registerStudentThunk(id, campusId))
  }
})(AssignCampusForm)