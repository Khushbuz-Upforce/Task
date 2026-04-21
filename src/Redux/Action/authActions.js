import api from "../../api/client";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: "AUTH_LOGIN_REQUEST" });

  try {
    const response = await api.post("/auth/login", {
      ...credentials,
      expiresInMins: 30,
    });

    const token = response.data.accessToken || response.data.token;
    const user = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      image: response.data.image,
    };

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));

    dispatch({
      type: "AUTH_LOGIN_SUCCESS",
      payload: { token, user },
    });
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Login failed. Please check your username and password.";

    dispatch({
      type: "AUTH_LOGIN_FAILURE",
      payload: message,
    });

    throw new Error(message);
  }
};

export const registerUser = (payload) => async (dispatch) => {
  dispatch({ type: "AUTH_REGISTER_REQUEST" });

  try {
    const response = await api.post("/users/add", payload);

    dispatch({
      type: "AUTH_REGISTER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Registration failed. Please try again.";

    dispatch({
      type: "AUTH_REGISTER_FAILURE",
      payload: message,
    });

    throw new Error(message);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  dispatch({ type: "AUTH_LOGOUT" });
};
