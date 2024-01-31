const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../../models/userModel/user');
const { generateToken } = require('../../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, } = req.body;
  let { role } = req.body

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  if(!role) role = {role:'user'}

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Failed to register user!');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
    ]
  } : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const getAllNotificaton = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  const seennotification = user.seennotification;
  const notification = user.notification;
  seennotification.push(...notification);
  user.notification = [];
  user.seennotification = notification;
  const updatedUser = await user.save();
  res.status(200).send({
    success: true,
    message: "all notification marked as read",
    data: updatedUser,
  });
});

const deleteNotification = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  user.notification = [];
  user.seennotification = [];
  const updatedUser = await user.save();
  updatedUser.password = undefined;
  res.status(200).send({
    success: true,
    message: "all notification deleted",
    data: updatedUser,
  });
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
  getAllNotificaton,
  deleteNotification,
}