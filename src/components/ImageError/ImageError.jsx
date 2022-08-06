import errorImage from '../../img/no picture.jpeg';
import PropTypes from 'prop-types';

const ImageError = error => (
  <div>
    <img
      className={'Img-error'}
      src={errorImage}
      alt={error.message}
      width="348"
    />
  </div>
);
export default ImageError;

ImageError.propTypes = {
  message: PropTypes.string.isRequired,
};
