const { UserService } = require("../services/index");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    res.status(201).json({
      data: response,
      success: true,
      message: "Successfull created user",
      err: {},
    });
  } catch (err) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to create user",
      err: err,
    });
  }
};

module.exports = {
  create,
};
