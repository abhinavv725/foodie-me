import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatchCart } from "./ContextReducer";
import { useCart } from "./ContextReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  let options = props.options;
  let priceOptions = [];
  let finalPrice;

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  if (options === undefined) {
    return null;
  } else {
    // storing keys of an object
    priceOptions = Object.keys(options);
    finalPrice = quantity * parseInt(options[size]);
  }
  const handleAddToCart = async () => {
    toast.success("Item Added To Cart Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    let food = [];
    // Data is state values coming from useCart context
    // Below functionality for the time that if we already have that item in our cart then do not add it again just update its quantity and price accordingly
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food);
    if (food !== []) {
      if (food.size === size) {
        // means when size is same that is we are again adding large pizza then we do not need to change size in cart we just need to update its quantity
        // This is where our update case comes into play
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          quantity: quantity,
        });
        return;
      } else if (food.size !== size) {
        // if food size is changing means we have to add whole item into cart again with different prize and size accordingly
        // we do not need to use 'UPDATE' case here
        // we will use 'ADD' here
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
          img: props.foodItem.img,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
      img: props.foodItem.img,
    });
  };

  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: "18rem", maxHeight: "fit-content" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ width: "auto", objectFit: "fill", height: "171px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p
            className="card-text"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.foodItem.description}
          </p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-secondary rounded"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data + 1} value={data} ref={priceRef}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-6">₹{finalPrice}</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-content-center ms-2"
            style={{
              fontWeight: "bold",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        <ToastContainer
          position="top-center"
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
    </div>
  );
};

export default Card;
