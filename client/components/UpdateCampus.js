import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCampus } from '../store';

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
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
      await this.props.update(this.props.campus.id, {name: this.state.name, address: this.state.address});
      console.log('submitted');
    } catch (error) {
      console.log(error);
    }
  }
  onChange(ev) {
    this.setState({[ev.target.name] : ev.target.value})
  }
  render() {
    const { onSubmit, onChange, state: {name, address}} = this
    return (
      <div>
        <h2>update campus</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor={name} >Name:
              <input name='name' value={name} onChange={onChange} ></input>
            </label>
            <label htmlFor={address} >Address:
              <input name='address' value={address} onChange={onChange} ></input>
            </label>
            <button>Update Campus</button>
        </form>
      </div>
    )
  }
}

export default connect(({campuses},{match}) => {
  const campus = campuses.find(campus => campus.id === match.params.id*1) || {}
  return {
    campus
  }
}, (dispatch, { history }) => {
  return {
    update: (campus, data) => dispatch(updateCampus(campus, data, history))
  }
})(UpdateCampus);