import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus, createStudent } from '../store';

class AddStudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName : '',
      lastName: '',
      email: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async onSubmit(ev) {
    ev.preventDefault();
    const { firstName, lastName, email } = this.state
    try {
      await this.props.create(firstName, lastName, email);
    } catch (error) {
      console.log(error);
    }
  }
  onChange(ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }
  render() {
    const { state: {firstName, lastName, email}, onChange, onSubmit } = this;
    return (
      <div>
        <h1>Enter student info</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor={firstName} >First Name:
            <input name='firstName' value={firstName} onChange={onChange} ></input>
          </label>
          <label htmlFor={lastName} >Last Name:
            <input name='lastName'  value={lastName} onChange={onChange} ></input>
          </label>
          <label htmlFor={email} >E-mail:
            <input name='email'  value={email} onChange={onChange} ></input>
          </label>
          
          <button className='add-campus-btn'>Add Student</button>
        </form>
      </div>
    )
  }
}

export default connect(null, (dispatch, { history }) => {
  return {
    create: async (firstName, lastName, email) => dispatch(createStudent(firstName, lastName, email, history))
  }
})(AddStudentForm);