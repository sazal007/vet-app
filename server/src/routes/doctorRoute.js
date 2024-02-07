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
} = require("../controllers/usersControllers/doctorController");
const { protect } = require("../middleware/authMiddleware");

router.get("/get-doctor", getDoctorDetails);
router.get("/all-doctors", getAllDoctors);
router.post("/register-doctor", registerDoctor);
router.delete("/delete-doctor/:id", deleteDoctor);
router.put("/update-doctor/:id", updateDoctor);
router.get("/approved-doctors", getApprovedDoctor);
router.post("/change-status", changeStatus);

module.exports = router;
