const tasks = require("./routes/tasks");
const auth = require("./routes/auth");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

connection();

app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port ${port}...`));
