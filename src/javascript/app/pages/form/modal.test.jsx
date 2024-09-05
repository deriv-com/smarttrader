import { Button, Modal, Text } from '@deriv-com/quill-ui';
import React, { useState } from 'react';

const ModalTest = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button
                size='lg'
                label='Modal Button'
                onClick={() => setIsOpen(true)}
            />

            <Modal
                isMobile
                showHandleBar
                isOpened={isOpen}
                isNonExpandable
                shouldCloseModalOnSwipeDown
                shouldCloseOnPrimaryButtonClick
                primaryButtonLabel='Continue verification'
                buttonColor='coral'
                showSecondaryButton
                showCrossIcon
                toggleModal={setIsOpen}
                // toggleModal={handleStayAtPhoneVerificationPage}
                secondaryButtonLabel='Cancel'
                // secondaryButtonCallback={handleLeavePhoneVerificationPage}
            >
                <Modal.Header title='Cancel phone number verification?' />
                <Modal.Body>
                    <div className='phone-verification__cancel-modal--contents'>
                        <Text>
                            If you cancel, you will ll lose all progress.
                        </Text>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalTest;
