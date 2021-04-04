import React, { Component } from "react";
import { connect } from "react-redux";
import CREATORS from "../../../store/actions/creators";
import thunks from "../../../store/thunks";

class UpdateCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageUrl: "",
      description: "",
      errors: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const { campus } = this.props;
    const newState = {
      name: campus.name,
      address: campus.address,
      imageUrl: campus.imageUrl,
      description: campus.description,
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
    const { name, address, imageUrl, description } = this.state;
    const data = {
      name,
      address,
      imageUrl,
      description,
    };
    this.props.update(this.props.campus.id, data, this.props.history);
    console.log("submitted");
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const {
      onSubmit,
      onChange,
      state: { name, address, imageUrl, description },
    } = this;
    return (
      <form onSubmit={onSubmit}>
        <section>
          <label htmlFor={name}>Campus Name: </label>
          <input name="name" value={name} onChange={onChange}></input>
        </section>
        <section>
          <label htmlFor={address}>Address: </label>
          <input name="address" value={address} onChange={onChange}></input>
        </section>
        <section>
          <label htmlFor={imageUrl}>Campus Image URL: </label>
          <input name="imageUrl" value={imageUrl} onChange={onChange}></input>
        </section>
        <section className="description-section">
          <label htmlFor={description}>Campus Description: </label>
          <textarea
            name="description"
            className="campus-description-textarea"
            value={description}
            onChange={onChange}
          ></textarea>
        </section>
        <ul className="error-list">
          {this.state.errors.map((err) => {
            return <li className="error-message">{err.message}</li>;
          })}
        </ul>
        <button className="add-btn">Update Campus</button>
      </form>
    );
  }
}

export default connect(
  (state) => {
    return {
      errors: state.errors,
    };
  },
  (dispatch) => {
    const { updateCampus } = thunks.campus;
    const { clearErrors } = CREATORS;
    return {
      update: (campus, data, history) =>
        dispatch(updateCampus(campus, data, history)),
      clearErr: () => dispatch(clearErrors()),
    };
  }
)(UpdateCampusForm);
