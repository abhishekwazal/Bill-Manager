const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connection established ${mongoose.connection.host}`,
      colors.bgGreen
    );
  } catch (error) {
    console.log(`${error}`, colors.bgRed);
  }
};

module.exports = connectDb;
