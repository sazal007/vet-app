const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
  getAllNotificaton,
  deleteNotification,
  checkAvailability,
  getAppointments,
  bookAppointment,
} = require("../controllers/usersControllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/fileUpload");

router.post("/register", upload.single("pic"), registerUser);
router.post("/login", authUser);
router.get("/", protect, allUsers);
router.post("/get-notification", protect, getAllNotificaton);
router.post("/delete-notification", protect, deleteNotification);
router.post("/book-appointment", protect, bookAppointment);
router.post("/check-availability", protect, checkAvailability);
router.get("/get-appointments", protect, getAppointments);

module.exports = router;
