import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunks from '../../../store/thunks';
import CREATORS from '../../../store/actions/creators'

class AddCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      errors: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.setState({...this.state, errors: []});
  }
  componentDidUpdate(prevProps) {
    const { errors, clearErr } = this.props;
    if (prevProps.errors.length !== errors.length) {
      this.setState({...this.state, errors: prevProps.errors})
      clearErr()
    }
  }
  componentWillUnmount() {
    this.setState({...this.state, errors: []})
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.create(this.state.name, this.state.address);  
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
            <input name='name' className='input' value={name} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={address} >Address:
            </label>
            <input name='address' className='input' value={address} onChange={onChange} ></input>

          </section>
          <ul className='error-list'>
            {
              this.state.errors.map(err => {
                return (
                  <li className='error-message'>{err.message}</li>
                )
              } )
            }
          </ul>
          <button className='add-btn'>Add Campus</button>
        </form>
      </main>
    )
  }
}

export default connect((state) => {
  const { errors } = state;
  return {
    errors
  }
}, (dispatch, { history }) => {
  const { createCampus } = thunks.campus;
  const { clearErrors } = CREATORS;
  return {
    create: (name, address) => dispatch(createCampus(name, address, history)),
    clearErr: () => dispatch(clearErrors())
  }
})(AddCampusForm);