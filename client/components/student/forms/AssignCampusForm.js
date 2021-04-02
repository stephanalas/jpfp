import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunks from '../../../store/thunks';

class AssignCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  handleChange(ev) {
    this.setState({ value: ev.target.value})
  }
  async onSubmit(ev) {
    ev.preventDefault();
    await this.props.register(this.props.student.id, this.state.value)

  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <select value={this.state.value} onChange={this.handleChange} name='campuses'>
          <option>Select Campus</option>
          {
            this.props.campuses.map(campus => <option  value={`${campus.id}`} >{campus.name}</option>)
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
  const { registerStudent } = thunks.student
  return {
    register: (id, campusId) => dispatch(registerStudent(id, campusId))
  }
})(AssignCampusForm)