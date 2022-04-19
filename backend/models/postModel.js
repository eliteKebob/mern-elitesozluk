const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: [50, "Başlık 50 karakteri aşamaz!"],
      minLength: [1, "Başlık en az 1 karakter barındırmalı!"],
    },
    text: {
      type: String,
      required: true,
      maxLength: [150, "Mesaj 150 karakteri aşamaz!"],
      minLength: [1, "Mesaj en az 1 karakter barındırmalı!"],
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
        text: {
          type: String,
          required: true,
          maxLength: [150, "Mesaj 150 karakteri aşamaz!"],
          minLength: [1, "Mesaj en az 1 karakter barındırmalı!"],
        },
        username: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Post", postSchema)
