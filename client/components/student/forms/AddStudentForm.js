import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  createStudentThunk } from '../../../store';

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
    const { state: {firstName, lastName, email }, onChange, onSubmit } = this;
    return (
      <main id='add-student-view' className='add-view'>
        <h2>Enter Student Info</h2>
        <form id='add-form' onSubmit={onSubmit}>
          <section>
            <label htmlFor={firstName} >First Name:
            </label>
            <input name='firstName' value={firstName} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={lastName} >Last Name:
            </label>
            <input name='lastName'  value={lastName} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={email} >E-mail:
            </label>
            <input name='email'  value={email} onChange={onChange} ></input>
          </section>
          <button className='add-btn'>Add Student</button>
        </form>
      </main>
    )
  }
}

export default connect(null, (dispatch, { history }) => {
  return {
    create: async (firstName, lastName, email,) => dispatch(createStudentThunk(firstName, lastName, email, history))
  }
})(AddStudentForm);