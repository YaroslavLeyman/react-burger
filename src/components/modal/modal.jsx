import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ( { onClose, children, title } ) => {

  const reactModals = document.getElementById('react-modals')

  React.useEffect(() => {
    const handlerEscape = (event) => {
      if (event.type === "keydown" && event.code === "Escape") {
          onClose();
      }
    }

    document.addEventListener("keydown", handlerEscape);

    return () => {
        document.removeEventListener("keydown", handlerEscape);
    }
  });

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={modalStyles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.closeModalButton} onClick={() => onClose()} >
          <CloseIcon type="primary" />
        </div>

        {title &&
          <div className={`${modalStyles.headerContainer} mt-10 ml-10 mr-10`}>
            <h2 className="text text_type_main-large">{title}</h2>
          </div>
        }

        {children}

      </div>
    </ModalOverlay>,
    reactModals
  )

}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
}

export default Modal;
