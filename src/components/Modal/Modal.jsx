import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../../styles.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, onOpen, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, handleBackdropClick);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={'Overlay'} onClick={handleBackdropClick}>
      <div className={'Modal'}>
        {children}
        <img src={onOpen} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  onOpen: PropTypes.string.isRequired,
};
