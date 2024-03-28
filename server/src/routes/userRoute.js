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
  getAllUsers,
} = require("../controllers/usersControllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/fileUpload");

router.post("/register", upload.single("pic"), registerUser);
router.post("/login", authUser);
router.get("/", protect, allUsers);
router.get("/get-all-user", getAllUsers);
router.post("/get-notification", getAllNotificaton);
router.post("/delete-notification", deleteNotification);
router.post("/book-appointment", bookAppointment);
router.post("/check-availability", checkAvailability);
router.get("/get-appointments", getAppointments);

module.exports = router;
