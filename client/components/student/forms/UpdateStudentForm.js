import React, { Component } from "react";
import { connect } from "react-redux";
import CREATORS from "../../../store/actions/creators";
import thunks from "../../../store/thunks";

class UpdateStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gpa: "",
      imageUrl: "",
      email: "",
      errors: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { student } = this.props;
    const newState = {
      firstName: student.firstName,
      lastName: student.lastName,
      gpa: student.gpa,
      imageUrl: student.imageUrl,
      email: student.email,
      errors: [],
    };
    this.setState(newState);
  }

  componentDidUpdate(prevProps) {
    const { errors, clearErr } = this.props;
    if (prevProps.errors.length !== errors.length) {
      this.setState({ ...this.state, errors: prevProps.errors });
      clearErr();
    }
  }

  componentWillUnmount() {
    this.setState({ ...this.state, errors: [] });
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateStudent(
      this.props.student.id,
      this.state,
      this.props.history
    );
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const {
      onChange,
      onSubmit,
      state: { firstName, lastName, gpa, imageUrl, email },
    } = this;
    return (
      <main className="update-view">
        <form onSubmit={onSubmit}>
          <span>Update Student</span>
          <section>
            <label htmlFor={firstName}>First Name:</label>

            <input
              name="firstName"
              value={firstName}
              onChange={onChange}
            ></input>
          </section>
          <section>
            <label htmlFor={lastName}>Last Name:</label>
            <input name="lastName" value={lastName} onChange={onChange}></input>
          </section>
          <section>
            <label htmlFor={gpa}>GPA:</label>
            <input name="gpa" value={gpa} onChange={onChange}></input>
          </section>
          <section>
            <label htmlFor={imageUrl}>Student URL:</label>
            <input name="imageUrl" value={imageUrl} onChange={onChange}></input>
          </section>
          <section>
            <label htmlFor={email}>E-mail:</label>
            <input name="email" value={email} onChange={onChange}></input>
          </section>
          <ul className="error-list">
            {this.state.errors.map((err) => {
              return <li className="error-message">{err.message}</li>;
            })}
          </ul>
          <button className="add-btn">Update Student</button>
        </form>
      </main>
    );
  }
}

export default connect(
  (state, otherProps) => {
    const student =
      state.students.find(
        (student) => student.id === otherProps.match.params.id * 1
      ) || {};
    const { errors } = state;
    return {
      student,
      errors,
    };
  },
  (dispatch, { history }) => {
    const { updateStudent } = thunks.student;
    const { clearErrors } = CREATORS;
    return {
      updateStudent: (id, data) => dispatch(updateStudent(id, data, history)),
      clearErr: () => dispatch(clearErrors()),
    };
  }
)(UpdateStudentForm);
