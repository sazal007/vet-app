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
  const userId = req.user._id;
  const newDoctor = await Doctor.create({
    userId,
    ...req.body,
    status: "pending",
  });
  res.status(200).json({
    success: true,
    message: "Doctor Account Applied Successfully",
    data: newDoctor,
  });

  const adminUser = await User.findOne({ role: "admin" });
  if (adminUser) {
    // Appending a new notification to the admin user's notifications
    adminUser.notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account.`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
        onClickPath: "/admin/doctors-list",
      },
    });

    // Saving the changes to the admin user
    await adminUser.save();
  }
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ message: "Deleted successfully" });
});

const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOneAndUpdate(
    { userId: req.body.userId },
    req.body,
    {
      new: true,
    }
  );
  if (!doctor) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ message: "Updated successfully" });
});

const getDoctorDetails = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.status(200).send({
    success: true,
    message: "doctor data fetch success",
    data: doctor,
  });
});

const getSingleDoctor = asyncHandler(async (req, res) => {
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
  const doctor = await Doctor.findOne({ userId: req.user.id });
  const appointments = await Appointment.find({
    doctorId: doctor._id,
  });
  res.status(200).send({
    success: true,
    message: "Doctor Appointments fetch Successfully",
    data: appointments,
  });
});

const acceptAppointment = asyncHandler(async (req, res) => {
  const { appointmentsId, status, userId } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentsId,
    { status },
    { new: true }
  );

  const user = await User.findOne({ _id: userId });
  const notification = user.notification;
  notification.push({
    type: "status-updated",
    message: `your appointment has been updated ${status}`,
    onClickPath: "/appointments",
  });
  await user.save();
  res.status(200).send({
    success: true,
    message: `Appointment ${status}`,
    data: appointment,
  });
});

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
  getSingleDoctor,
};
