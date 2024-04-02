const asyncHandler = require("express-async-handler");
const Post = require("../../models/userModel/posts");

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  let images;

  if (req.files) {
    images = req.files.map((file) => file.path);
  } else {
    images = [];
  }

  // Attach the owner (user) of the post to the request
  const user = req.user._id;

  // Create the post
  const post = await Post.create({
    user,
    title,
    content,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.status(200).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ message: "Deleted successfully" });
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "something went wrong" });
  }

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ error: "User not authorized" });
  }

  let updatedFields = {
    title,
    content,
  };
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true }
  );

  res.status(200).json(updatedPost);
});

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
};
