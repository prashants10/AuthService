const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const { UserService } = require("./services/index");

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log("Server started on port " + PORT);
    // const userService = new UserService();
    // const user = await userService.signIn({
    //   email: "psprashant1003@gmail.com",
    //   password:"Password@123"
    // });
    // console.log("user", user);
  });
};

setupAndStartServer();
