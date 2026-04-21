const getInitialToken = () => {
  try {
    return localStorage.getItem("auth_token");
  } catch (error) {
    return null;
  }
};

const getInitialUser = () => {
  try {
    const rawUser = localStorage.getItem("auth_user");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  loading: false,
  registering: false,
  token: getInitialToken(),
  user: getInitialUser(),
  isAuthenticated: Boolean(getInitialToken()),
  error: null,
  registerError: null,
  registerSuccess: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "AUTH_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "AUTH_LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "AUTH_REGISTER_REQUEST":
      return {
        ...state,
        registering: true,
        registerError: null,
        registerSuccess: null,
      };

    case "AUTH_REGISTER_SUCCESS":
      return {
        ...state,
        registering: false,
        registerError: null,
        registerSuccess: `Registered "${action.payload.firstName || action.payload.username || "User"}" successfully. Please login.`,
      };

    case "AUTH_REGISTER_FAILURE":
      return {
        ...state,
        registering: false,
        registerError: action.payload,
        registerSuccess: null,
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        loading: false,
        token: null,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
