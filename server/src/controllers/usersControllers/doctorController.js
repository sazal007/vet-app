const asyncHandler = require('express-async-handler');
const Doctor = require('../../models/userModel/doctor');
const User = require('../../models/userModel/user');

const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) {
    res.status(400);
    throw new Error('Doctor not found');
  }
  res.status(200).json(doctor);
});

const registerDoctor = asyncHandler(async (req, res) => {
  const newDoctor = await Doctor.create({
    ...req.body, status: "pending"
  });
  res.status(200).json({
    success: true,
    message: "Doctor Account Applied Successfully",
    data: newDoctor
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


module.exports = {
  getDoctor,
  registerDoctor
}