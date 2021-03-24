import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../store';

class AddCampusForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.create(this.state.name, this.state.address);
    } catch (error) {
      console.log(error);
    }
  }
  onChange(ev) {
    this.setState({[ev.target.name] : ev.target.value})
  }
  render() {
    const { state: {name, address}, onChange, onSubmit } = this;
    return (
      <div>
        <h1>Campus Name</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor={name} >Name:
            <input name='name' id='name' value={name} onChange={onChange} ></input>
          </label>
          <label htmlFor={address} >Address:
            <input name='address' id='address' value={address} onChange={onChange} ></input>
          </label>
          
          <button className='add-campus-btn'>Add Campus</button>
        </form>
      </div>
    )
  }
}

export default connect(null, (dispatch, { history }) => {
  return {
    create: (name, address) => dispatch(createCampus(name, address, history))
  }
})(AddCampusForm);