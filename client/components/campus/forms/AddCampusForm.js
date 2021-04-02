import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunks from '../../../store/thunks';

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
      <main id='add-campus-view' className='add-view'>
        <h2>Enter Campus Info</h2>
        <form id='add-campus-form' className='add-form' onSubmit={onSubmit}>
          <section>
            <label htmlFor={name} >Name:
            </label>
            <input name='name' value={name} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={address} >Address:
            </label>
            <input name='address' value={address} onChange={onChange} ></input>

          </section>
          
          <button className='add-btn'>Add Campus</button>
        </form>
      </main>
    )
  }
}

export default connect(null, (dispatch, { history }) => {
  const { createCampus } = thunks.campus
  return {
    create: (name, address) => dispatch(createCampus(name, address, history))
  }
})(AddCampusForm);