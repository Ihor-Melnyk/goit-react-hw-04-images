import Searchbar from './Searchbar';
import ImageInfo from './ImageInfo';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export function App() {
  const [imageName, setImageName] = useState('');

  return (
    <div className={'App'}>
      <Searchbar onSubmit={setImageName} />
      <ImageInfo imageName={imageName} />
      <Toaster position="top-left" reverseOrder={false} />
    </div>
  );
}
