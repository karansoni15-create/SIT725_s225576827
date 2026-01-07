const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/books", routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/sit725_books")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
