require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// lokeshmelkani
// lokeshmelkani

const mongoDB = async () => {
  await mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("connected to db ");
      // Reading the data from our collection in mongo atlas
      const fetchedData = await mongoose.connection.db.collection("food_items");
      const food_items_array = await fetchedData.find({}).toArray();
      // Storing data in global variable so that we can retrieve it in DisplayData.js end point
      const food_Category = await mongoose.connection.db.collection(
        "food_category"
      );
      const food_category_array = await food_Category.find({}).toArray();

      global.food_items = food_items_array;
      global.food_category = food_category_array;

      // console.log(global.food_items);
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};

module.exports = mongoDB;

/*
 const fetchedData = mongoose.connection.db.collection("food_items");
        fetchedData.find({}).toArray(function (err, data) {
          if (err) {
            console.log(err);
            console.log("eereeer");
          } else {
            console.log(data);
            console.log("eereeer");
          }
        });

*/
