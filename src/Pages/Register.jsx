import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Action/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registering, registerError, registerSuccess } = useSelector(
    (state) => state.auth
  );
  const [localMessage, setLocalMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalMessage("");

    if (!formData.firstName || !formData.email || !formData.username || !formData.password) {
      setLocalMessage("Please fill all required fields.");
      return;
    }

    try {
      await dispatch(registerUser(formData));
      setLocalMessage("Registration complete. Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (submitError) {
      setLocalMessage(submitError.message);
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: "520px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h1 className="h4 mb-3">Register</h1>
          <p className="text-muted small mb-3">
            This page calls DummyJSON `users/add` API to demonstrate a registration flow.
          </p>

          {(localMessage || registerSuccess) && (
            <div className="alert alert-success py-2">{localMessage || registerSuccess}</div>
          )}
          {registerError && <div className="alert alert-danger py-2">{registerError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name*
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="username" className="form-label">
                  Username*
                </label>
                <input
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password*
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
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3" disabled={registering}>
              {registering ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mb-0 mt-3 text-center">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
