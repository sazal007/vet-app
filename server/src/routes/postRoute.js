const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/fileUpload");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
} = require("../controllers/usersControllers/postController");

router.post("/create-post", protect, upload.array("images", 5), createPost);
router.get("/get-post", protect, getAllPosts);
router.get("/get-post/:id", protect, getSinglePost);
router.delete("/delete-post/:id", protect, deletePost);
router.put("/update-post/:id", protect, updatePost);

module.exports = router;
