import PropTypes from 'prop-types';
import '../../styles.css';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Enter a picture name');
      return;
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={'Searchbar'}>
      <form className={'SearchForm'} onSubmit={handleSubmit}>
        <button className={'SearchForm-button'} type="submit">
          <BsSearch fontSize="20px" />
        </button>

        <input
          className={'SearchForm-input'}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
