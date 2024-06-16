const { AdminModel } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError");
const config = require("../config/config");


const signinAdmin = async ({email, password}) => {
    try {
        const check = await AdminModel.findOne({email:email});

        if(!check){
          throw new ApiError(400, "Admin does not exists with this email")
        }
        
        const checkPassword = await bcrypt.compare(password,check.password)

      
        if (checkPassword) {
            const token = jwt.sign({ id: check._id, email: check.email }, config.jwtSecret);
            return {accessToken:token, user:{email:check.email, _id:check._id}};
        } else {
            throw new ApiError(400, "Incorrect password");
        }

    } catch (error) {
        throw new ApiError(500, error.message)
    }
}

const signupAdmin = async ({ email, password }) => {
    try {
        const existingAdmin = await AdminModel.findOne({ email });

        if (existingAdmin) {
            throw new ApiError(400, "Admin already exists with this email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new AdminModel({
            email,
            password: hashedPassword
        });

        const savedAdmin = await newAdmin.save();

        return {_id:savedAdmin._id, email:savedAdmin.email}

    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

module.exports = {
    signinAdmin, 
    signupAdmin
}

