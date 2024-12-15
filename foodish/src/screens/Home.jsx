import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch(
      "https://foodishmernbackend.onrender.com/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    // console.log(res[0], res[1]);
    setFoodItems(res[0]);
    setFoodCategory(res[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
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
              <div className="d-flex ">
                <input
                  className="form-control me-2 bg-light"
                  type="search"
                  value={search}
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ color: "black" }}
                />
                {/*<button
                  className="btn btn-outline-success text-light"
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    border: "1px solid black",
                    fontWeight: "bold",
                  }}
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300?pasta"
                className="d-block w-100"
                alt="Food image 1"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "fill",
                  height: "fit-content",
                }}
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
      <div className="container">
        {foodCategory !== []
          ? foodCategory.map((data) => {
              console.log("data from foodCategory is ", data);
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItems !== [] ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filteredItems) => {
                        return (
                          <div
                            key={filteredItems._id}
                            className="col-12 col-md-6 col-lg-3 m-3"
                          >
                            <Card
                              foodItem={filteredItems}
                              options={filteredItems.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Data Found !!</div>
                  )}
                </div>
              );
            })
          : ""}
        {/*
        <Card foodItems={foodItems} foodCategory={foodCategory} />
        */}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
