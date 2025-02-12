const { hashPassword } = require('../helpers/Hashing.helper.js');
const User = require('../models/User.model.js');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get a single user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};


// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password, ", email, password")
    const existingUsers = await User.find({email});
    if (existingUsers.length > 0) {
      return res.status(404).json({ message: 'User already exist' });
    }
    const hash_Password = await hashPassword(password)
    const newUser = new User({ username, email, password: hash_Password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  try {
    const { name, email, id } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
