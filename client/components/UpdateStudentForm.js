import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateStudentThunk } from '../store';

class UpdateStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      imageUrl: '',
      email: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { student } = this.props
    const newState = {
      firstName: student.firstName,
      lastName: student.lastName,
      gpa: student.gpa,
      imageUrl: student.imageUrl,
      email: student.email
    }
    this.setState(newState);
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateStudent(this.props.student.id, this.state, this.props.history)
  }

  onChange(ev) {
    this.setState({[ev.target.name] : ev.target.value})
  }
  render() {
    const { onChange, onSubmit, state: { firstName, lastName, gpa, imageUrl, email}} = this;
    return (
      <main className='update-view'>

        <form onSubmit={onSubmit} >
          <span>Update Student</span>
          

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
            <label htmlFor={gpa} >GPA:
            </label>
              <input name='gpa'  value={gpa} onChange={onChange} ></input>

          </section>
          <section>
            <label htmlFor={imageUrl} >Student URL:
            </label>
              <input name='imageUrl'  value={imageUrl} onChange={onChange} ></input>

          </section>
          <section>
            <label htmlFor={email} >E-mail:
            </label>
              <input name='email'  value={email} onChange={onChange} ></input>

          </section>
          <button className='add-btn'>Update Student</button>
          
        </form>
      </main>
    )
  }
}

export default connect((state, otherProps) => {
  const student = state.students.find(student => student.id === otherProps.match.params.id*1) || {};
  return {
    student
  }
}, (dispatch, { history }) => {
  return {
    updateStudent: (id, data) => dispatch(updateStudentThunk(id, data, history))
  }
})(UpdateStudentForm)