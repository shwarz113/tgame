import './index.css';
// @ts-ignore
export const Popup = ({ children, title, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-title">
                {title} <span onClick={onClose}>X</span>
            </div>
            <div className="popup-body">{children}</div>
        </div>
    );
};
