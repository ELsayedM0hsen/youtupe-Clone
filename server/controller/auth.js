import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Oops!User Doesn't Existed.you can signup ");
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json("Oops!Password Doesn't Correct ");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        subscribers: user.subscribers,
        subscriberedUser: user.subscriberedUser,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

export const googleSign = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          img: foundUser.img,
          subscribers: foundUser.subscribers,
          subscriberedUser: foundUser.subscriberedUser,
          token: token,
        });
    } else {
      const newUser = await User.create({
        ...req.body,
        fromGoogle: true,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          img: newUser.img,
          subscribers: newUser.subscribers,
          subscriberedUser: newUser.subscriberedUser,
          token: token,
        });
    }
  } catch (error) {
    next(error);
  }
};
