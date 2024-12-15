import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://foodishmernbackend.onrender.com/api/createUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.address,
      }),
    });

    const json = await response.json();
    if (json.success) {
      console.log("Successfully signup");
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/login");
    } else {
      console.log("Failed to signup");
      toast.error("Failed to Signup", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <section style={{ backgroundColor: "white", width: "100%" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div
              className="col-lg-12 col-xl-11"
              style={{ marginBottom: "50px" }}
            >
              <div
                className="card text-dark"
                style={{
                  borderRadius: "25px",
                  marginTop: "25px",
                  marginBottom: "50px",
                  background: "#EDE9E9",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="name"
                              value={credentials.name}
                              onChange={handleChange}
                              id="name"
                              className="form-control"
                              placeholder="Enter Your Name"
                              style={{
                                background: "white",
                                color: "black",
                              }}
                              minLength={3}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              value={credentials.email}
                              onChange={handleChange}
                              id="email"
                              className="form-control"
                              placeholder="Enter Your Email"
                              style={{
                                background: "white",
                                color: "black",
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              value={credentials.password}
                              onChange={handleChange}
                              id="password"
                              className="form-control"
                              placeholder="Enter Your Password"
                              style={{
                                background: "white",
                                color: "black",
                              }}
                              minLength={5}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="address"
                              value={credentials.address}
                              onChange={handleChange}
                              id="address"
                              className="form-control"
                              placeholder="Enter Your Address"
                              style={{
                                background: "white",
                                color: "black",
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-lg"
                            style={{
                              background: "#F05F22",
                              color: "black",
                              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            }}
                          >
                            Register
                          </button>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Link
                            to="/login"
                            style={{
                              color: "black",
                            }}
                          >
                            Already a user
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={logo}
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Signup;
