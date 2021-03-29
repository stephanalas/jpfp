import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCampus } from '../store';
import CampusCard from './CampusCard';
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
      <main className='update-view' id='update-campus-view'>
        
        <h1>Update campus</h1>
        {/* <CampusCard key={this.props.campus}  /> */}
        <form onSubmit={onSubmit}>
          <section>
            <label htmlFor={name} >Name: </label>
            <input name='name' value={name} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={address} >Address: </label>
            <input name='address' value={address} onChange={onChange} ></input>
          </section>
            <button className='add-btn'>Update Campus</button>
        </form>
      </main>
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