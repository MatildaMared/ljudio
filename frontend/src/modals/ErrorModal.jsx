import React from "react";

const ErrorModal = props => {
 

    if (!props.show) {
        return null
    }

  return (
    <div className="error-modal" onClick={props.onClose}>
      <div className="error-modal__content" onClick={e => e.stopPropagation()}>
        <div className="error-modal__header">
          <h4 className="error-modal__title">{props.title}</h4>
        </div>
        <div className="error-modal__body">
            {props.children}
        </div>
        <div className="error-modal__footer">
          <button onClick={props.onClose} className="error-modal__btn">Close</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
