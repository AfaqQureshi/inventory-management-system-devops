import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "./services/productService";

import ProductForm from "./components/ProductForm";
import ConfirmDialog from "./components/ConfirmDialog";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category))
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const lowStockCount = products.filter(
    (product) => product.quantity <= product.minStock
  ).length;

  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const handleSaveProduct = async (productData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      setSuccessMessage("Product updated successfully.");
    } else {
      await addProduct(productData);
      setSuccessMessage("Product added successfully.");
    }

    await loadProducts();

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDelete = async () => {
    if (!deletingProduct) {
      return;
    }

    try {
      await deleteProduct(deletingProduct.id);

      setDeletingProduct(null);
      setSuccessMessage("Product deleted successfully.");

      await loadProducts();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app">
      {successMessage && (
        <div className="success-toast">
          <span className="success-check">✓</span>
          {successMessage}
        </div>
      )}

      <header className="header">
        <div>
          <h1>Inventory Management</h1>
          <p>Manage your products and keep track of stock.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="stat-card">
          <span>Total Units</span>
          <strong>{totalQuantity}</strong>
        </div>

        <div className="stat-card">
          <span>Low Stock</span>
          <strong>{lowStockCount}</strong>
        </div>
      </section>

      <section className="toolbar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>
      </section>

      {error && <div className="error-message">{error}</div>}

      <section className="product-section">
        {loading ? (
          <div className="empty-state">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try changing your search or category filter.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Min Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => {
                  const isLowStock = product.quantity <= product.minStock;

                  return (
                    <tr
                      key={product.id}
                      className={isLowStock ? "low-stock-row" : ""}
                    >
                      <td className="product-name">{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price.toLocaleString("en-IN")}</td>
                      <td>{product.quantity}</td>
                      <td>{product.minStock}</td>
                      <td>
                        <span
                          className={
                            isLowStock
                              ? "status low"
                              : "status available"
                          }
                        >
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="action-button"
                          onClick={() => {
                            setEditingProduct(product);
                            setShowForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => setDeletingProduct(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      {deletingProduct && (
        <ConfirmDialog
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
