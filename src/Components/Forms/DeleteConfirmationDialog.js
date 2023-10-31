import React from "react";

function DeleteConfirmationDialog({ onConfirm, onCancel }) {
    return (
        <div className="delete-confirmation-dialog">
            <p>Are you sure you want to delete this?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    );
}

export default DeleteConfirmationDialog;
