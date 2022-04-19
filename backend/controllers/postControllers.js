const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel.js")

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  res.status(200).json(post)
})

const getRecentPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).limit(50).sort({ updatedAt: -1 })

  res.status(200).json(posts)
})

const getSearchPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    title: req.body.title,
    $options: "i",
  })

  res.status(200).json(post)
})

const createPost = asyncHandler(async (req, res) => {
  const user = req.user

  if (!req.body.title || !req.body.text) {
    res.status(400)
    throw new Error("Bütün alanları doldurun!")
  }

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  const post = await Post.create({
    text: req.body.text,
    title: req.body.title,
    user: req.user.id,
    username: req.user.username,
  })

  res.status(200).json(post)
})

const updatePost = asyncHandler(async (req, res) => {
  const user = req.user.id

  const post = await Post.findById(req.params.id)

  if (!req.body.text || !req.body.title) {
    res.status(400)
    throw new Error("Bütün alanları doldurun!")
  }

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
})

const deletePost = asyncHandler(async (req, res) => {
  const user = req.user.id

  const post = await Post.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Geçersiz işlem!")
  }

  await post.remove()

  res.status(200).json({ id: req.params.id })
})

const createComment = asyncHandler(async (req, res) => {
  const user = req.user.id

  const post = await Post.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  const newComment = {
    text: req.body.text,
    user: req.user.id,
    username: req.user.username,
  }

  post.comments.unshift(newComment)

  await post.save()

  res.json(post)
})

const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  )

  if (!comment) {
    return res.status(404).json({ msg: "Yorum bulunamadı!" })
  }

  if (comment.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Başkasına ait bir yorumu silemezsin" })
  }

  post.comments = post.comments.filter(({ id }) => id !== req.params.comment_id)

  await post.save()

  return res.json(post)
})

const likePost = asyncHandler(async (req, res) => {
  const user = req.user.id

  const post = await Post.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Kullanıcı bulunamadı!")
  }

  if (!req.user) {
    res.status(401)
    throw new Error("Önce giriş yapın!")
  }

  // Beğeni kontrol
  if (post.likes.some((like) => like.user.toString() === req.user.id)) {
    return res.status(400).json({ msg: "Bu postu zaten beğenmişsin!" })
  }

  post.likes.unshift({ user: req.user.id })

  await post.save()

  return res.json(post)
})

module.exports = {
  getPost,
  getRecentPosts,
  getSearchPost,
  createPost,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
  likePost,
}
