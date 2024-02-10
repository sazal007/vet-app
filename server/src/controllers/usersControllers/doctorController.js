const asyncHandler = require("express-async-handler");
const Doctor = require("../../models/userModel/doctor");
const User = require("../../models/userModel/user");
const Appointment = require("../../models/userModel/appointment");

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  if (!doctors) {
    res.status(400);
    throw new Error("Doctors not found");
  }
  res.status(200).json(doctors);
});

const registerDoctor = asyncHandler(async (req, res) => {
  const newDoctor = await Doctor.create({
    ...req.body,
    status: "pending",
  });
  res.status(200).json({
    success: true,
    message: "Doctor Account Applied Successfully",
    data: newDoctor,
  });

  const adminUser = await User.findOne({ role: "admin" });
  const notifcation = adminUser.notifcation;
  notifcation.push({
    type: "apply-doctor-request",
    message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
    data: {
      doctorId: newDoctor._id,
      name: newDoctor.firstName + " " + newDoctor.lastName,
      onClickPath: "/admin/docotrs",
    },
  });

  await User.findByIdAndUpdate(adminUser._id, { notifcation });
  res.status(201).send({
    success: true,
    message: "Doctor Account Applied Successfully",
  });
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ message: "Deleted successfully" });
});

const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doctor) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ message: "Updated successfully" });
});

const getDoctorDetails = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.status(200).send({
    success: true,
    message: "doctor data fetch success",
    data: doctor,
  });
});

const getApprovedDoctor = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ status: "approved" });
  if (!doctors) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.status(200).send({
    success: true,
    message: "doctor data fetch success",
    data: doctors,
  });
});

const changeStatus = asyncHandler(async (req, res) => {
  const { doctorId, status } = req.body;
  const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
  const user = await User.findOne({ _id: doctor.userId });
  const notification = user.notification;
  notification.push({
    type: "doctor-account-request-updated",
    message: `Your Doctor Account Request Has ${status} `,
    onClickPath: "/notification",
  });
  user.isDoctor = status === "approved" ? true : false;
  await user.save();
  res.status(201).send({
    success: true,
    message: "Account Status Updated",
    data: doctor,
  });
});

const doctorAppointments = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.body.userId });
  const appointments = await Appointment.find({
    doctorId: doctor._id,
  });
  res.status(200).send({
    success: true,
    message: "Doctor Appointments fetch Successfully",
    data: appointments,
  });
});

const acceptAppointment = asyncHandler(async (req, res) => {});

module.exports = {
  getAllDoctors,
  registerDoctor,
  deleteDoctor,
  updateDoctor,
  getDoctorDetails,
  getApprovedDoctor,
  changeStatus,
  doctorAppointments,
  acceptAppointment,
};
