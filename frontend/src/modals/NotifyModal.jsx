import React from "react";

function NotifyModal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className=" modal modal-content">
      <div className="modal-header">
        <h4 className="modal-title">{props.title}</h4>
      </div>
    </div>
  );
}

export default NotifyModal;
