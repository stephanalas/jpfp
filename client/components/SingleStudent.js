import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from '../store';
class  SingleStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      email: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(ev) {
    ev.preventDefault()
    try {
      await this.props.update(this.props.student.id, {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email});
      console.log('submitted');
    } catch (error) {
      console.log(error);
    }
  }
  onChange(ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }
  render() {
    const { student, campus} = this.props
    const { onChange, onSubmit, state: { firstName, lastName, email} } = this
    return (
      <div id='update-student-main'>
        <h1>Student Info</h1>
        <div className='update-container'>

            <main>
              <ul>
                <img src={`${student.imageUrl}`} />
                <li>Name: {student.firstName} {student.lastName}</li>
                <li>GPA: {student.gpa}</li>
                <li>Email: {student.email}</li>
                <li>Campus: { campus.id ? <Link to={`/campuses/${campus.id}`}>{campus.name}</Link> : 'Not currently attending a campus'}</li>
              </ul>
              <button onClick={() => {
                const editSection = document.querySelector('#update-student')
                editSection.className === 'edit-student' ? editSection.className = 'edit-student-selected' : editSection.className = 'edit-student'
              }}>edit</button>
              <button>delete</button>
              
            </main>
            <section id='update-student' className='edit-student'>
            <h1>Enter student info</h1>
            <h2>Update Student</h2>
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
              
              <button className='add-campus-btn'>Update Student</button>
            </form>
          </section>
        </div>
      </div> 
    )

  }
} 

export default connect((state,otherProps) => {
  const student = state.students.find(student => student.id === otherProps.match.params.id*1) || {};

  const campus = state.campuses.find(campus => campus.id === student.campusId) || {};
  const { history } = otherProps;

  return {
    student,
    campus,
    history
  }
}, (dispatch, { history } ) => {
    return {
      update: (id, data) => dispatch(updateStudent(id, data, history))
    }
})(SingleStudent)