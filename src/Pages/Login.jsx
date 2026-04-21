import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Action/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    if (!formData.username || !formData.password) {
      setLocalError("Both username and password are required.");
      return;
    }

    try {
      await dispatch(loginUser(formData));
      const redirectPath = location.state?.from?.pathname || "/products";
      navigate(redirectPath, { replace: true });
    } catch (submitError) {
      setLocalError(submitError.message);
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: "460px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h1 className="h4 mb-3">Login</h1>
          <p className="text-muted small">
            DummyJSON sample credentials are prefilled for easy testing.
          </p>

          {(localError || error) && (
            <div className="alert alert-danger py-2">{localError || error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mb-0 mt-3 text-center">
            Need an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
