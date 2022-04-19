const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Lütfen kullanıcı adınızı belirtin"],
      unique: true,
      maxLength: [20, "Kullanıcı adı 20 karakteri aşamaz!"],
      minLength: [2, "Kullanıcı adı en az 2 karakter barındırmalı!"],
    },
    email: {
      type: String,
      required: [true, "Lütfen e-postanızı belirtin"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Lütfen şifrenizi girin"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
