import React, {Component} from 'react'
import { connect } from 'react-redux';
import { updateCampusThunk } from '../../../store/store'
class UpdateCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const { campus } = this.props;
    console.log(campus)
    const newState = {
      name: campus.name,
      address: campus.address,
      imageUrl: campus.imageUrl,
      description: campus.description
    }
    this.setState(newState);
  }
  async onSubmit(ev) {
    ev.preventDefault();
    const { name, address, imageUrl, description } = this.state;
    try {
      const data = {
        name,
        address,
        imageUrl,
        description
      }
      await this.props.update(this.props.campus.id, data, this.props.history);
      console.log('submitted');
    } catch (error) {
      console.log(error);
    }
  }
  onChange(ev) {
    this.setState({[ev.target.name] : ev.target.value})
    console.log(ev.target.name, this.state[ev.target.name])
  }
  render() {
    const { onSubmit, onChange, state: {name, address, imageUrl, description}} = this;
    return (
      <form onSubmit={onSubmit}>
          <section>
            <label htmlFor={name} >Campus Name: </label>
            <input name='name' value={name} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={address} >Address: </label>
            <input name='address' value={address} onChange={onChange} ></input>
          </section>
          <section>
            <label htmlFor={imageUrl} >Campus Image URL: </label>
            <input name='imageUrl' value={imageUrl} onChange={onChange} ></input>
          </section>
          <section className='description-section'>
            <label htmlFor={description} >Campus Description: </label>
            <textarea name='description' className='campus-description-textarea' value={description} onChange={onChange} ></textarea>
          </section>
            <button className='add-btn'>Update Campus</button>
        </form>
    )
  }
}

export default connect(null, (dispatch) => {
  return {
    update: (campus, data, history) => dispatch(updateCampusThunk(campus, data, history))
  }
})(UpdateCampusForm);