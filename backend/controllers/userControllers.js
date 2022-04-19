const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })
  }

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
  
    if (!username || !email || !password) {
      res.status(400)
      throw new Error("Bütün alanları doldurun!")
    }
  
    // Email kayıtlı mı kontrol
    const userExists = await User.findOne({ email })
    // Nickname kayıtlı mı kontrol
    const usernameExists = await User.findOne({username})
  
    if (userExists) {
      res.status(400)
      throw new Error("Email zaten kullanımda!")
    }

    if (usernameExists) {
        res.status(400)
        throw new Error("Kullanıcı adı zaten kullanımda!")
      }

    // Şifreyi hashleme
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Kullanıcıyı oluştur
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error("Geçersiz kullanıcı bilgileri")
    }
  })

  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Email kayıtlı mı kontrol
    const user = await User.findOne({ email })
  
    // Şifreleri karşılaştır
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error("Geçersiz kullanıcı bilgileri")
    }
  })

  const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(400)
      throw new Error("Kullanıcı bulunamadı!")
    }
    res.status(200).json(user)
  })

  module.exports = {
    registerUser,
    loginUser,
    getUser,
  }

  