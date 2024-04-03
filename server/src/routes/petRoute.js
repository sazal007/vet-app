const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/fileUpload");
const {
  createPet,
  updatePetProfile,
  getPetProfile,
  deletePetProfile,
} = require("../controllers/usersControllers/petController");

router.post("/create-profile", upload.single("image"), protect, createPet);
router.get("/get-pet", protect, getPetProfile);
router.put(
  "/update-profile/:id",
  upload.single("image"),
  protect,
  updatePetProfile
);
router.delete("/delete-pet/:id", protect, deletePetProfile);

module.exports = router;
