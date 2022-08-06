import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import '../../styles.css';

const ImageGallery = ({ imageName, cardClick, imgForModal }) => {
  return (
    <ul className={'ImageGallery'}>
      {imageName.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          cardClick={cardClick}
          imgForModal={imgForModal}
          key={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          alt={tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imageName: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  cardClick: PropTypes.func,
  imgForModal: PropTypes.func,
};
