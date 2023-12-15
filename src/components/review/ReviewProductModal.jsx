import {Modal} from "antd";

const ReviewProductModal = ({isOpen, setIsOpen, order}) => {
    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };
    return (
        <Modal title="Basic Modal" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default ReviewProductModal