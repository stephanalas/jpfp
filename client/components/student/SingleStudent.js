import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunks from '../../store/thunks';
import AssignCampusForm from './forms/AssignCampusForm';
import CampusCard from '../campus/CampusCard'

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
    const { student, history, destroy} = this.props
    return (
      <main id='update-student-main'>
        <h1>Student Info</h1>
        <section className='single-student-view'>
          <div className='student'>
            <img className='student-img' src={`${student.imageUrl}`} />
            <div className='student-info'>
              <span className='student-name'>{student.firstName} {student.lastName}</span>
              <span className='student-gpa'>GPA: {student.gpa}</span>
              <div className='student-tools'>
                <button className='student-btns single-view-edit' onClick={() => history.push(`/students/update/${student.id}`)}>edit</button>
                <button className='student-btns single-view-delete' onClick={() => destroy(student)}>delete</button>
              </div>
            </div>  
          </div>
        </section>
        <section className='student-view-campus-section'>
          <div>
            {
              student.campus  ? <span>This student is registered to a campus</span> : <span>This student is not registered to a campus</span>
            }
            <AssignCampusForm student={student} />
          </div>
            {
              student.campus ? <CampusCard campus={student.campus} /> : ''
            }
        </section>
      </main> 
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
  const { updateStudent, destroyStudent } = thunks.student;
    return {
      update: (id, data) => dispatch(updateStudent(id, data, history)),
      destroy: (student) => dispatch(destroyStudent(student, history))
    }
})(SingleStudent)