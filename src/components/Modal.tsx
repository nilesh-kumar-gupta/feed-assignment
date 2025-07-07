import useModal from "../hooks/useModal.ts";
import { createPortal } from "react-dom";
import closeIcon from '../assets/close.svg';

const Modal = () => {
  const { isOpen, closeModal, modalContent, modalTitle } = useModal();

  if (!isOpen) return null;

  const modalElement = (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div className="absolute inset-0 bg-gray-400 opacity-50"></div>

      <div
        className="relative bg-white rounded-lg shadow-xl min-w-2/5 max-w-1/2 max-h-10/12 overflow-x-scroll min-h-1/6 mx-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {modalTitle && <h3 className="text-lg font-medium text-gray-900">{modalTitle}</h3>}
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={closeModal}
          >
            <span className="sr-only">Close</span>
            <img src={closeIcon} alt="Close" className="h-6 w-6"/>
          </button>
        </div>

        <div className="mt-2">
          {modalContent}
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalElement,
    document.body
  );
};

export default Modal;
