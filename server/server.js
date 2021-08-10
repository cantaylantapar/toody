const tasks = require("./routes/tasks");
const auth = require("./routes/auth");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

connection();

app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// The other solution for production stage:

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => console.log(`Server is running on port ${port}...`));
