import React from 'react';
import '../../styles/modal.css';

const WarningModal = props => {

    if (!props.show) {
        return null
    }

    return (
        <div className="warning-modal">
            <div className="warning-modal__content" onClick={e => e.stopPropagation()}>
                <div className="warning-modal__header">
                <h4 className="warning-modal__title">{props.title}</h4>
                </div>
                <div className="warning-modal__body">
                    {props.children}
                </div>
                <div className="warning-modal__footer">
                <button onClick={props.onClose} className="warning-modal__btn">No</button>
                <button onClick={props.onDelete} className="warning-modal__btn">Yes</button>
                </div>
            </div>
            </div>
    )
}

export default WarningModal
