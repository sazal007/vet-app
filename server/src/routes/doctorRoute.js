const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  getAllDoctors,
  deleteDoctor,
  updateDoctor,
  getDoctorDetails,
  changeStatus,
  getApprovedDoctor,
  doctorAppointments,
  acceptAppointment,
} = require("../controllers/usersControllers/doctorController");
const { protect } = require("../middleware/authMiddleware");

router.get("/get-doctor", protect, getDoctorDetails);
router.get("/all-doctors", protect, getAllDoctors);
router.post("/register-doctor", protect, registerDoctor);
router.delete("/delete-doctor/:id", protect, deleteDoctor);
router.post("/update-doctor", protect, updateDoctor);
router.get("/approved-doctors", protect, getApprovedDoctor);
router.post("/change-status", protect, changeStatus);
router.get("/get-doc-appoitments", protect, doctorAppointments);
router.post("/accept-appointment", protect, acceptAppointment);

module.exports = router;
