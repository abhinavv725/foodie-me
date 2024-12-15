const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  //   console.log("1231242343242354", req.body.email);

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    // First Order for that user so create an order array for that email id
    try {
      //   console.log(data);
      //   console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      //   console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    // This is not the first order for that user so we need to update its my order history
    // Append the data so we use $push
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      //   console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

module.exports = router;
