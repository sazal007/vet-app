const asyncHandler = require("express-async-handler");
const Pet = require("../../models/userModel/pet");

const createPet = asyncHandler(async (req, res) => {
  const { pet_name, species, breed, age, gender, description, birthdate } =
    req.body;
  let image;

  if (req.file) {
    image = req.file.path;
  } else {
    image = "https://example.com/default-pet.jpg"; // Default photo URL
  }

  // Ensure all required fields are present
  if (!pet_name || !species) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  // Attach the owner (user) of the pet profile to the request
  const owner = req.user._id;

  // Create the pet profile
  const petProfile = await Pet.create({
    owner,
    pet_name,
    species,
    breed,
    age,
    gender,
    description,
    image,
    birthdate,
  });

  res.status(201).json(petProfile);
});

const getPetProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // Find pet profiles where the 'owner' field matches the logged-in user's ID
  const petProfiles = await Pet.find({ owner: userId }).populate(
    "owner",
    "name email"
  );

  if (petProfiles.length === 0) {
    return res
      .status(404)
      .json({ message: "No pet profiles found for this user." });
  }

  res.json(petProfiles);
});

const updatePetProfile = asyncHandler(async (req, res) => {
  const { pet_name, species, breed, age, gender, description, birthdate } =
    req.body;

  // Find the pet profile by ID
  let petProfile = await Pet.findById(req.params.id);

  if (!petProfile) {
    res.status(404).json({ error: "Pet profile not found" });
  }

  // Ensure the user updating the pet profile is the owner
  if (petProfile.owner.toString() !== req.user._id.toString()) {
    res.status(401).json({ error: "Unauthorized" }); // Unauthorized
  }

  // Prepare updated fields object, starting with the fields that are always expected to be updated
  let updatedFields = {
    pet_name,
    species,
    breed,
    age,
    gender,
    description,
  };
  if (birthdate) {
    updatedFields.birthdate = birthdate; // Only update the birthdate if it's provided
  }

  if (req.file) {
    updatedFields.image = req.file.path; // Only update the image if a new file is uploaded
  }

  // Update the pet profile with the new values, including the image if it was provided
  const updatedPetProfile = await Pet.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true }
  );

  res.status(200).json(updatedPetProfile);
});

const deletePetProfile = asyncHandler(async (req, res) => {
  const petProfile = await Pet.findByIdAndDelete(req.params.id);
  if (!petProfile) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.json({ message: "Deleted successfully" });
});

module.exports = {
  createPet,
  getPetProfile,
  updatePetProfile,
  deletePetProfile,
};
