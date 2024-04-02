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
  addComments,
  getComments,
  likePost,
  getLikes,
} = require("../controllers/usersControllers/postController");

router.post("/create-post", protect, upload.array("images", 5), createPost);
router.get("/get-post", protect, getAllPosts);
router.get("/get-post/:id", protect, getSinglePost);
router.delete("/delete-post/:id", protect, deletePost);
router.put("/update-post/:id", protect, updatePost);
router.post("/comments/:id", protect, addComments);
router.get("/comments/:id", protect, getComments);
router.post("/like-post/:id", protect, likePost);
router.get("/like-post/:id", protect, getLikes);

module.exports = router;
