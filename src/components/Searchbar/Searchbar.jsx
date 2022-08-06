import { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles.css';
import { BsSearch } from 'react-icons/bs';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={'Searchbar'}>
        <form className={'SearchForm'} onSubmit={this.handleSubmit}>
          <button className={'SearchForm-button'} type="submit">
            <BsSearch fontSize="20px" />
          </button>

          <input
            className={'SearchForm-input'}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
