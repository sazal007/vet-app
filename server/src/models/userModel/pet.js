const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    pet_name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
