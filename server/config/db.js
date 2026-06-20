// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(
//       process.env.MONGO_URI
//     );

//     console.log(
//       `MongoDB Connected: ${conn.connection.host}`
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = connectDB;


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (process.env.NODE_ENV !== "test") {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }

    return conn;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;