const express = require("express");
const cors = require("cors");
const db = require("./models/db");

const PORT = process.env.NODE_PORT || 5000;
const app = express();

const shareRouter = require("./router/shareRouter");

app.use(express.json());
app.use(cors());

app.get("/", (req, res, err) => res.send("hello world"));
app.use("/share", shareRouter);

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
