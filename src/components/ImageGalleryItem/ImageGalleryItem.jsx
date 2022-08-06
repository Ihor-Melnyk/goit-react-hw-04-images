import PropTypes from 'prop-types';
import '../../styles.css';

const ImageGalleryItem = ({
  cardClick,
  id,
  webformatURL,
  largeImageURL,
  alt,
}) => {
  const handleImage = () => {
    cardClick(largeImageURL);
  };

  return (
    <li className={'ImageGalleryItem'} id={id}>
      <img
        className={'ImageGalleryItem-image'}
        src={webformatURL}
        alt={alt}
        onClick={handleImage}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  cardClick: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
