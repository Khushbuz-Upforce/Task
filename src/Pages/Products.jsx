import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../Redux/Action/productActions";

const Products = () => {
  const dispatch = useDispatch();
  const { items, total, loading, mutating, error } = useSelector(
    (state) => state.products
  );
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    stock: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const startEditing = (product) => {
    setStatusMessage("");
    setEditingId(product.id);
    setEditForm({
      title: product.title,
      price: product.price,
      stock: product.stock,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ title: "", price: "", stock: "" });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSave = async (id) => {
    const priceNumber = Number(editForm.price);
    const stockNumber = Number(editForm.stock);

    if (!editForm.title.trim() || Number.isNaN(priceNumber) || Number.isNaN(stockNumber)) {
      setStatusMessage("Enter valid title, price and stock values.");
      return;
    }

    try {
      await dispatch(
        updateProduct(id, {
          title: editForm.title.trim(),
          price: priceNumber,
          stock: stockNumber,
        })
      );
      setStatusMessage("Product updated successfully.");
      cancelEditing();
    } catch (saveError) {
      setStatusMessage(saveError.message);
    }
  };

  const handleDelete = async (id) => {
    setStatusMessage("");

    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await dispatch(deleteProduct(id));
      setStatusMessage("Product deleted successfully.");
      if (editingId === id) {
        cancelEditing();
      }
    } catch (deleteError) {
      setStatusMessage(deleteError.message);
    }
  };

  return (
    <section>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Product List Table</h2>
            <span className="badge text-bg-primary">Total: {total}</span>
          </div>

          {loading && <p className="mb-0">Loading products...</p>}
          {(statusMessage || error) && (
            <div className={`alert py-2 ${error ? "alert-danger" : "alert-info"}`}>
              {statusMessage || error}
            </div>
          )}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        {editingId === product.id ? (
                          <input
                            type="text"
                            name="title"
                            className="form-control form-control-sm"
                            value={editForm.title}
                            onChange={handleEditChange}
                          />
                        ) : (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              width="40"
                              height="40"
                              className="rounded object-fit-cover"
                            />
                            <span>{product.title}</span>
                          </div>
                        )}
                      </td>
                      <td>{product.category}</td>
                      <td>
                        {editingId === product.id ? (
                          <input
                            type="number"
                            name="price"
                            className="form-control form-control-sm"
                            value={editForm.price}
                            onChange={handleEditChange}
                          />
                        ) : (
                          `$${product.price}`
                        )}
                      </td>
                      <td>{product.rating}</td>
                      <td>
                        {editingId === product.id ? (
                          <input
                            type="number"
                            name="stock"
                            className="form-control form-control-sm"
                            value={editForm.stock}
                            onChange={handleEditChange}
                          />
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td className="d-flex gap-2">
                        {editingId === product.id ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={() => handleSave(product.id)}
                              disabled={mutating}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={cancelEditing}
                              disabled={mutating}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => startEditing(product)}
                            disabled={mutating}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(product.id)}
                          disabled={mutating}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
