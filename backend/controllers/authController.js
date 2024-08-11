const { z } = require("zod");
const userModel = require("../models/userModel");
const { hashPassword } = require("../helpers/authHelper");

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
    const MyhashedPassword = await hashPassword(password);

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

module.exports = registerController;
