import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Modal } from '@deriv-com/quill-ui';

const ErrorModal = ({ message, buttonText, onButtonClick }) => {
    const [isOpened, setIsOpened] = React.useState(true);
    
    return (
        <Modal
            isOpened={isOpened}
            toggleModal={()=>setIsOpened(!isOpened)}
            showCrossIcon={false}
            buttonColor='coral'
            primaryButtonCallback={onButtonClick}
            primaryButtonLabel={buttonText}
            width='sm'
            portalId='error_modal_container'
        >
            <Modal.Body>{message}</Modal.Body>
        </Modal>
    );
};

ErrorModal.propTypes = {
    buttonText   : PropTypes.string.isRequired,
    message      : PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
};

const ErrorModalModule = (() => {
    let container = null;

    const init = (props) => {
        // Clean up any existing modal first
        if (container) {
            remove();
        }

        container = document.createElement('div');
        container.id = 'error_modal_container';
        container.className = 'error_modal_container';
        document.body.appendChild(container);
        
        ReactDOM.render(<ErrorModal {...props} />, container);
    };

    const remove = () => {
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.remove();
            container = null;
        }
    };

    return {
        init,
        remove,
    };
})();

export default ErrorModalModule;
