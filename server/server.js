// require("crypto");
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// const userRoutes = require("./routes/userRoutes");
// const taskRoutes = require("./routes/taskRoutes");

// const errorHandler = require("./middleware/errorMiddleware");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// console.log(process.env.MONGO_URI);

// // Connect MongoDB Atlas
// connectDB();

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);

// // Test Route
// app.get("/", (req, res) => {
//   res.json({
//     message: "CampusConnect API Running",
//   });
// });

// // Error Middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server Running On Port ${PORT}`);
// });





require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });
}

module.exports = app;