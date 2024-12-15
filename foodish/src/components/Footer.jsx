import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <Link className="mx-2 text-light" href="http://localhost:3000/">
            Foodish.com
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
