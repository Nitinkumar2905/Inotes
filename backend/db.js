const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://nimble2905:nimble2905@cluster0.quzlruu.mongodb.net/inotes?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected successfully to Mongo");
  } catch (error) {
    console.error("Error connecting to Mongo:", error.message);
  }
};

module.exports = connectToMongo;
