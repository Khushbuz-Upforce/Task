const initialState = {
  items: [],
  total: 0,
  loading: false,
  mutating: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_FETCH_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "PRODUCTS_FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        mutating: false,
        error: null,
        items: action.payload.items,
        total: action.payload.total,
      };

    case "PRODUCTS_FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "PRODUCTS_MUTATION_REQUEST":
      return {
        ...state,
        mutating: true,
        error: null,
      };

    case "PRODUCTS_UPDATE_SUCCESS":
      return {
        ...state,
        mutating: false,
        error: null,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };

    case "PRODUCTS_DELETE_SUCCESS":
      return {
        ...state,
        mutating: false,
        error: null,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total > 0 ? state.total - 1 : 0,
      };

    case "PRODUCTS_MUTATION_FAILURE":
      return {
        ...state,
        mutating: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
