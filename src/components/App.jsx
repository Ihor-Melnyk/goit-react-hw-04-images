import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageInfo from './ImageInfo';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    imageName: '',
  };
  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className={'App'}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageInfo imageName={this.state.imageName} />
        <Toaster position="top-left" reverseOrder={false} />
      </div>
    );
  }
}
