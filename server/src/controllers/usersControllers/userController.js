const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel/user");
const Appointment = require("../../models/userModel/appointment");
const { generateToken } = require("../../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let pic;
  if (req.file) {
    pic = req.file.path;
  } else {
    pic =
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  }
  let { role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  if (!role) role = { role: "user" };

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });
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
    throw new Error("Failed to register user!");
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
      role: user.role,
      isDoctor: user.isDoctor,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  return res.status(200).send(users);
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

const bookAppointment = asyncHandler(async (req, res) => {
  req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
  req.body.time = moment(req.body.time, "HH:mm").toISOString();
  req.body.status = "pending";

  const appointment = await Appointment.create(req.body);

  const user = await User.findOne({ _id: req.body.doctorInfo.userId });
  const notification = user.notification;
  notification.push({
    type: "new-appointment-request",
    message: `New Appointment Request From ${req.body.userInfo.name}`,
    onClickPath: "/user/appointments",
  });
  user.isDoctor = false;
  await user.save();

  res.status(201).send({
    success: true,
    message: "Appointment booked successfully",
    data: appointment,
  });
});

const checkAvailability = asyncHandler(async (req, res) => {
  const date = moment(req.body.date, "DD-MM-YY").toISOString();
  const fromTime = moment(req.body.time, "HH:mm")
    .subtract(1, "hours")
    .toISOString();
  const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
  const doctorId = req.body.doctorId;
  const appointments = await Appointment.find({
    doctorId,
    date,
    time: {
      $gte: fromTime,
      $lte: toTime,
    },
  });

  if (appointments.length > 0) {
    res.status(400).send({
      success: true,
      message: "Appointments not available",
    });
  } else {
    res.status(200).send({
      success: true,
      message: "Appointments available",
    });
  }
});

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ userId: req.body.userId });
  res.status(200).send({
    success: true,
    data: appointments,
  });
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
  getAllNotificaton,
  deleteNotification,
  bookAppointment,
  checkAvailability,
  getAppointments,
  getAllUsers,
};
