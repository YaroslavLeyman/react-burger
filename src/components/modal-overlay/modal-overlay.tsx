import React, { ReactNode } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlay {
  children: ReactNode;
  onClose: () => void;
}

const ModalOverlay = ( { children, onClose }: IModalOverlay ) => {
  return (
    <div className={modalOverlayStyles.overlay} id="overlay" onClick={onClose}>
      {children}
    </div>
  )
}

export default ModalOverlay;
