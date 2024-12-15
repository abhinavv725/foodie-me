import React from "react";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/4.avif";
import image4 from "../images/5.avif";
import image5 from "../images/6.avif";

const Carousel = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          margin: "auto",
        }}
      >
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="false"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <form className="d-flex">
                <input
                  className="form-control me-2 bg-light"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ color: "black" }}
                />
                <button
                  className="btn btn-outline-success text-light"
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    border: "1px solid black",
                    fontWeight: "bold",
                  }}
                >
                  Search
                </button>
              </form>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300?pasta"
                className="d-block w-100"
                alt="Food image 1"
                style={{ filter: "brightness(30%)", objectFit: "contain" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300?pizza"
                className="d-block w-100"
                alt="Food Image 2"
                style={{ filter: "brightness(30%)", objectFit: "contain" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300?fries"
                className="d-block w-100"
                alt="Food Image 3"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "contain !important",
                }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
