const { User } = require("../models")
const ApiError = require("../utils/ApiError")

const createUser = async (data) => {
    try {
      const existingUser = await User.findOne({
        $or: [{ email: data.email }, { phone: data.phone }],
      });
  
      if (existingUser) {
        const errorMessage =
          existingUser.email === data.email
            ? "Email Id is already in Use"
            : "Contact Number is already in Use";
        throw new ApiError(409, errorMessage);
      }
  
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  };

module.exports =  {
 createUser
}