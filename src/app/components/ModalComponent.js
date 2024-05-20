import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import LoadingSpinner from './LoadingSpinner'; 
import '../styles/modalStyles.css'; 

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalContentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setIsModalOpen(true);
            setIsLoading(true);
        } else {
            setIsModalOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (content) {
            setIsLoading(false);
            adjustModalDimensions();
        }
    }, [content]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const adjustModalDimensions = () => {
        if (modalContentRef.current) {
            const modalContent = modalContentRef.current;
            const modalContentWidth = modalContent.offsetWidth;
            const modalContentHeight = modalContent.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const maxWidth = windowWidth - 100; // Adjust this value as needed
            const maxHeight = windowHeight - 100; // Adjust this value as needed

            // Adjust width
            if (modalContentWidth > maxWidth) {
                modalContent.style.width = `${maxWidth}px`;
            }

            // Adjust height
            if (modalContentHeight > maxHeight) {
                modalContent.style.maxHeight = `${maxHeight}px`;
            }
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onRequestClose}
            contentLabel="Article Content"
            className="modal"
            overlayClassName="overlay"
        >
            <button className="close-button" onClick={onRequestClose}>Close</button>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="modal-content" ref={modalContentRef} dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </Modal>
    );
};

export default ModalComponent;
