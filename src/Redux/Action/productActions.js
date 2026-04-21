import api from "../../api/client";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: "PRODUCTS_FETCH_REQUEST" });

  try {
    const response = await api.get("/products?limit=20");

    dispatch({
      type: "PRODUCTS_FETCH_SUCCESS",
      payload: {
        items: response.data.products,
        total: response.data.total,
      },
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_FETCH_FAILURE",
      payload:
        error.response?.data?.message ||
        "Unable to fetch products right now.",
    });
  }
};

export const updateProduct = (id, payload) => async (dispatch) => {
  dispatch({ type: "PRODUCTS_MUTATION_REQUEST" });

  try {
    const response = await api.put(`/products/${id}`, payload);

    dispatch({
      type: "PRODUCTS_UPDATE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    const message =
      error.response?.data?.message || "Unable to update this product.";

    dispatch({
      type: "PRODUCTS_MUTATION_FAILURE",
      payload: message,
    });

    throw new Error(message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: "PRODUCTS_MUTATION_REQUEST" });

  try {
    await api.delete(`/products/${id}`);

    dispatch({
      type: "PRODUCTS_DELETE_SUCCESS",
      payload: id,
    });
  } catch (error) {
    const message =
      error.response?.data?.message || "Unable to delete this product.";

    dispatch({
      type: "PRODUCTS_MUTATION_FAILURE",
      payload: message,
    });

    throw new Error(message);
  }
};
