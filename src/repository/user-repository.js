const { User } = require("../models/index");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.log("Something went wrong on repository layer");
      throw err;
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (err) {
      console.log("Something went wrong on repository layer");
      throw err;
    }
  }
}

module.exports = UserRepository;
