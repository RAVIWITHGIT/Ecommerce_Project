const { z } = require("zod");
const userModel = require("../models/userModel");
require("dotenv").config();
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    } else if (!email) {
      return res.send({ error: "Email is Required" });
    } else if (!password) {
      return res.send({ error: "password is Required" });
    } else if (!phone) {
      return res.send({ error: "phone is Required" });
    } else if (!address) {
      return res.send({ error: "address is Required" });
    }

    //check request type using zod
    const userRequestCheck = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      phone: z.string(),
      address: z.string(),
    });
    const userzod = userRequestCheck.safeParse(req.body);
    console.log(userzod);
    if (!userzod.success) {
      const error = userzod.error.format();
      return res.status(400).send({ message: false, error });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });

    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register",
      });
    }

    //register user
    const match = await hashPassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECERT, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });

    //save
    const user = await new userModel({
      name,
      email,
      password: MyhashedPassword,
      phone,
      address,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation for blank data
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

const testController = async (req, res) => {
  res.send("protect route");
};

module.exports = { registerController, loginController, testController };
