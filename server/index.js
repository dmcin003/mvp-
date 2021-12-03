const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(morgan("dev"));

//serving static files
app.use(express.static(path.join(__dirname, "../public")));

//routes

app.listen(port, () => {
  console.log(`server listening on port:${port}`);
});
