const express = require("express");
const app = express();
app.set("trust proxy", 1);
const { SERVER_PORT } = require("./env");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
require("./routes")(app);
app.set("x-powered-by", false);

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

module.exports = server;
