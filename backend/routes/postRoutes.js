const express = require("express")
const router = express.Router()

const {
  getPost,
  getRecentPosts,
  getSearchPost,
  createPost,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
  likePost,
} = require("../controllers/postControllers.js")

const { protect } = require("../middleware/authMiddleware.js")

router.route("/").post(protect, createPost).get(getRecentPosts)
router.route("/search").get(getSearchPost)
router
  .route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost)
router.route("/comment/:id").post(protect, createComment)
router.route("/comment/:id/:comment_id").delete(protect, deleteComment)
router.route("/like/:id").put(protect, likePost)

module.exports = router
