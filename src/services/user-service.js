const { UserRepository } = require("../repository/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (err) {
      console.log("Something went wrong on service layer");
      throw err;
    }
  }
}

module.exports = UserService;
