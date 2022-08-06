import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../../styles.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener(
      'keydown',
      this.handleKeyDown,
      this.handleBackdropClick
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'keydown',
      this.handleKeyDown,
      this.handleBackdropClick
    );
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={'Overlay'} onClick={this.handleBackdropClick}>
        <div className={'Modal'}>
          {this.props.children}
          <img src={this.props.onOpen} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  onOpen: PropTypes.string.isRequired,
};
