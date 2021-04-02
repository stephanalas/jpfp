import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerStudentThunk } from '../store';

class AddStudentCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  handleChange(ev) {
    this.setState({ value: ev.target.value})
  }
  async onSubmit(ev) {
    ev.preventDefault();
    await this.props.register(this.state.value, this.props.campus.id)

  }
  render() {
    return (
      <form className='student-tools-campus-view' onSubmit={this.onSubmit}>
        <select value={this.state.value} onChange={this.handleChange} name='students'>
          <option>Select student ...</option>
          {
            this.props.students.map(student => <option value={`${student.id}`}>{student.firstName} {student.lastName}</option>)
          }
        </select>
        <button className='add-btn'>Add to Campus</button>
      </form>
    )
  }
}

export default connect(null, (dispatch) => {
  return {
    register : (id, campusId) => dispatch(registerStudentThunk(id, campusId))
  }
})(AddStudentCampusForm);