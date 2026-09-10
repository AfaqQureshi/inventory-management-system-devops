function ConfirmDialog({ onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-dialog">
        <div className="confirm-icon">!</div>

        <h2>Delete product?</h2>

        <p>
          This action cannot be undone. The product will be permanently
          removed from your inventory.
        </p>

        <div className="confirm-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
