import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Action/authActions";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">React Redux Task</span>

          <div className="d-flex align-items-center gap-2 ms-auto">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? "btn-warning" : "btn-outline-light"}`
              }
            >
              Products
            </NavLink>
            <button type="button" className="btn btn-sm btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="mb-3">
          <h1 className="h4 mb-1">Welcome, {user?.firstName || user?.username || "User"}</h1>
          <p className="text-muted mb-0">
            Build requirement: authentication and product listing with edit/delete support.
          </p>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
