import React from "react";
import { useNavigate } from "react-router-dom";
// import Delete from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import StripeCheckout from "react-stripe-checkout";

export default function Cart() {
  let data = useCart();
  let navigate = useNavigate();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-3 w-100 text-center fs-3 font-weight-bold">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const url = "https://foodishmernbackend.onrender.com/api/orderData";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("order res ", response);
    if (response.status === 200) {
      // As we do checkout we need our table data to get cleared so we make another case in reducer by name "DROP"
      dispatch({ type: "DROP" });
    }
  };
  const onToken = (token) => {
    console.log(token);
    handleCheckout();
    navigate("/");
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div
        className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md "
        style={{ width: "100%", height: "240px", overflow: "auto" }}
      >
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr style={{ fontWeight: "bold", color: "red" }}>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount (₹)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="fs-3 mx-2 my-5">
          Total Price: <span style={{ color: "red" }}>{totalPrice}</span> /-
        </h1>
      </div>
      <div className="d-flex">
        {/* <button
          className="btn mx-2 mt-1 mb-5"
          style={{ background: "red", fontWeight: "bold", color: "black" }}
          onClick={handleCheckout}
        >
          {" "}
          Check Out{" "}
        </button>
    */}
        <div className="my-2 mx-2">
          <StripeCheckout
            token={onToken}
            stripeKey="pk_test_51LC2NxSI0MGahHVvswsQ9U6wYwWPq0TwgIsaW9TfBwfrbJ1DDPunX0YRMTZAhAG1AJEpRxffxas4GZXfm4Bhz4vD00lrcjiAsa"
            name="Foodish Order Payment"
            currency="INR"
            amount={totalPrice * 100}
          />
        </div>
      </div>
    </div>
  );
}
