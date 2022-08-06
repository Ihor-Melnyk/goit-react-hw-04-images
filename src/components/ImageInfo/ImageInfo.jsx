import { Component } from 'react';
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

export default class ImageInfo extends Component {
  state = {
    image: [],
    pageNumber: 1,
    pageMax: null,
    error: null,
    status: 'idle',
    showModal: false,
    imageModal: '',
  };

  componentDidUpdate(prevSProps, prevState) {
    const prevName = prevSProps.imageName;
    const nextName = this.props.imageName;

    const prevPageNumber = prevState.pageNumber;
    const nextPageNumber = this.state.pageNumber;

    //запит нового імені першої сторірнки
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      imageApi
        .fetchImage(nextName, '1')
        .then(image => {
          if (image.total === 0) {
            return Promise.reject(
              toast.error(`There is no picture with that name "${nextName}"`)
            );
          }
          const pageMax = Math.ceil(image.totalHits / 12);
          this.setState({
            pageNumber: 1,
            image: image.hits,
            status: 'resolved',
            pageMax: pageMax,
          });
        })
        .catch(error =>
          this.setState({
            error: `There is no picture with that name "${nextName}"`,
            status: 'rejected',
          })
        );
    }

    //запит наступних сторінок
    if (
      prevPageNumber !== nextPageNumber &&
      prevName === nextName &&
      nextPageNumber !== 1
    ) {
      this.setState({ status: 'pending' });

      imageApi
        .fetchImage(nextName, nextPageNumber)
        .then(image =>
          this.setState({
            image: [...prevState.image, ...image.hits],
            status: 'resolved',
          })
        )
        .catch(error =>
          this.setState({
            status: 'rejected',
          })
        );
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleCardImage = image => {
    this.setState({
      imageModal: image,
    });
    this.toggleModal();
  };

  handleBtnLoadMoreClick = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { image, status, error, pageNumber, pageMax, showModal } = this.state;
    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return (
        <>
          <ImageGallery imageName={image} />
          <Loader imageName={this.props.imageName} />
        </>
      );
    }
    if (status === 'rejected') {
      return <ImageError message={error} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery imageName={image} cardClick={this.handleCardImage} />
          {showModal && (
            <Modal onClose={this.toggleModal} onOpen={this.state.imageModal}>
              <button
                className={'Button-modal'}
                type="button"
                onClick={this.toggleModal}
              >
                <AiFillCloseCircle size={32} />
              </button>
            </Modal>
          )}

          {pageNumber !== pageMax && (
            <Button btnClick={this.handleBtnLoadMoreClick} />
          )}
        </>
      );
    }
  }
}

ImageInfo.propTypes = {
  imageName: PropTypes.string.isRequired,
};
