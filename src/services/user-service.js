const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserRepository } = require("../repository/index");
const { JWT_KEY } = require("../config/serverConfig");

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

  async signIn(data) {
    // check if user exists or not
    const user = await this.userRepository.getUserByEmail(data.email);
    if (user) {
      const passwordsMatch = this.checkPassword(data.password, user.password);
      
      // Check if password matches
      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
      const response = this.createToken({ email: user.email, id: user.id });
      return response;
    } else {
      console.log("User doesn't exist");
      throw { error: "User doesn't exist" };
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
