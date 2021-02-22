var express = require("express");
var app = express();
app.set("trust proxy", 1);
var SERVER_PORT = require("./env").SERVER_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
require("./routes")(app);
app.set("x-powered-by", false);
var server = app.listen(SERVER_PORT, function () {
    console.log("Server running on port " + SERVER_PORT);
});
module.exports = server;
//# sourceMappingURL=app.js.map