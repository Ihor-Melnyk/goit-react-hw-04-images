import ImageError from 'components/ImageError';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import imageApi from '../../services/image-api';
import Modal from 'components/Modal';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../../styles.css';
import { useState, useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageInfo({ imageName }) {
  const [image, setImage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageMax, setPageMax] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState('');
  const [prevImgName, setPrevImgName] = useState('');

  useEffect(() => {
    if (!imageName) {
      return;
    }

    if (imageName !== prevImgName) {
      setImage([]);
      setPageNumber(1);
      setPrevImgName(imageName);
      return;
    }
    setStatus(Status.PENDING);

    imageApi
      .fetchImage(prevImgName, pageNumber)
      .then(image => {
        if (image.total === 0) {
          return Promise.reject(
            toast.error(`There is no picture with that name "${imageName}"`)
          );
        }
        setPageMax(Math.ceil(image.totalHits / 12));

        pageNumber === 1
          ? setImage([...image.hits])
          : setImage(prevState => [...prevState, ...image.hits]);

        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(`There is no picture with that name "${imageName}"`);
        setStatus(Status.REJECTED);
      });
  }, [prevImgName, pageNumber, imageName]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCardImage = image => {
    setImageModal(image);
    toggleModal();
  };

  const handleBtnLoadMoreClick = () => {
    setPageNumber(pageNumber + 1);
  };

  if (status === Status.IDLE) {
    return;
  }
  if (status === Status.PENDING) {
    return (
      <>
        <ImageGallery imageName={image} />
        <Loader imageName={image} />
      </>
    );
  }
  if (status === Status.REJECTED) {
    return <ImageError message={error} />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery imageName={image} cardClick={handleCardImage} />
        {showModal && (
          <Modal onClose={toggleModal} onOpen={imageModal}>
            <button
              className={'Button-modal'}
              type="button"
              onClick={toggleModal}
            >
              <AiFillCloseCircle size={32} />
            </button>
          </Modal>
        )}
        {pageNumber !== pageMax && <Button btnClick={handleBtnLoadMoreClick} />}
      </>
    );
  }
}

ImageInfo.propTypes = {
  imageName: PropTypes.string.isRequired,
};
