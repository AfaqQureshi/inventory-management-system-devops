import { useState } from "react";

function ProductForm({ product, onClose, onSave }) {
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price ?? "",
    quantity: product?.quantity ?? "",
    minStock: product?.minStock ?? ""
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      formData.price === "" ||
      formData.quantity === "" ||
      formData.minStock === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const productData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock)
    };

    if (
      productData.price < 0 ||
      productData.quantity < 0 ||
      productData.minStock < 0
    ) {
      setError("Price, quantity and minimum stock cannot be negative.");
      return;
    }

    try {
      await onSave(productData);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
            <p>
              {isEditing
                ? "Update the product details."
                : "Add a new item to your inventory."}
            </p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Mouse"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Accessories"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="799"
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="10"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Minimum Stock</label>
            <input
              type="number"
              min="0"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              placeholder="5"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="save-button">
              {isEditing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
