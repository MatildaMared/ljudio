import React from 'react';
import '../../styles/modal.css';

const WarningModal = props => {

    if (!props.show) {
        return null
    }

    return (
<div className="modal">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
            {props.children}
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="buttons button">No</button>
          <button onClick={props.onDelete} className="buttons button">Yes</button>
        </div>
      </div>
    </div>
    )
}

export default WarningModal
