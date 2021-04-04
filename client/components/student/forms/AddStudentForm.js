import React, { Component } from "react";
import { connect } from "react-redux";
import CREATORS from "../../../store/actions/creators";
import thunks from "../../../store/thunks";

class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      errors: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.setState({ ...this.state, errors: [] });
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
    const { firstName, lastName, email } = this.state;
    this.props.create(firstName, lastName, email);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const {
      state: { firstName, lastName, email },
      onChange,
      onSubmit,
    } = this;
    return (
      <main id="add-student-view" className="add-view">
        <h2>Enter Student Info</h2>
        <form id="add-form" onSubmit={onSubmit}>
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
            <label htmlFor={email}>E-mail:</label>
            <input name="email" value={email} onChange={onChange}></input>
          </section>
          <ul className="error-list">
            {this.state.errors.map((err) => {
              return <li className="error-message">{err.message}</li>;
            })}
          </ul>
          <button className="add-btn">Add Student</button>
        </form>
      </main>
    );
  }
}

export default connect(
  (state) => {
    const { errors } = state;
    return {
      errors,
    };
  },
  (dispatch, { history }) => {
    const { createStudent } = thunks.student;
    const { clearErrors } = CREATORS;
    return {
      create: (firstName, lastName, email) =>
        dispatch(createStudent(firstName, lastName, email, history)),
      clearErr: () => dispatch(clearErrors()),
    };
  }
)(AddStudentForm);
