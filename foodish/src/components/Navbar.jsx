import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };
  return (
    <div style={{ opacity: "0.7" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontWeight: "bold",
              color: "white",
              fontFamily: "cursive",
              opacity: "1 important",
            }}
          >
            F🍔🍔dish
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 active"
                  aria-current="page"
                  to="/"
                  style={{
                    color: location.pathname === "/" ? "#FAA0A0" : "white",
                    fontWeight: location.pathname === "/" ? "bold" : "inherit",
                    paddingTop: "15px",
                  }}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 active"
                    aria-current="page"
                    to="/myOrderData"
                    style={{
                      color:
                        location.pathname === "/myOrderData"
                          ? "#FAA0A0"
                          : "white",
                      fontWeight:
                        location.pathname === "/myOrderData"
                          ? "bold"
                          : "inherit",
                      paddingTop: "15px",
                    }}
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-black mx-1 font-weight-bold"
                  to="/login"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <i class="fa-solid fa-right-to-bracket"></i>
                  <span className="mx-2">Login</span>
                </Link>
                <Link
                  className="btn bg-white text-black mx-1"
                  to="/createUser"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <i class="fa-solid fa-user-plus"></i>
                  <span className="mx-2">Signup</span>
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <button
                  className="btn bg-white text-black mx-1 font-weight-bold"
                  style={{
                    fontWeight: "bold",
                  }}
                  onClick={() => setCartView(true)}
                >
                  <i class="fa-solid fa-cart-shopping"></i>
                  <span className="mx-2">
                    My Cart{" "}
                    {data.length === 0 ? (
                      ""
                    ) : (
                      <span class="badge badge-dark bg-danger mx-2 text-black">
                        {data.length}
                      </span>
                    )}
                  </span>
                </button>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : (
                  ""
                )}
                <button
                  className="btn bg-white text-danger mx-1 font-weight-bold"
                  style={{
                    fontWeight: "bold",
                  }}
                  onClick={handleLogout}
                >
                  <i class="fa-solid fa-right-from-bracket"></i>
                  <span className="mx-2">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
