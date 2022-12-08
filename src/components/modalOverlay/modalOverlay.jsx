import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ( { children, onClose } ) => {
  return (
    <div className={modalOverlayStyles.overlay} id="overlay" onClick={() => onClose()}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;
