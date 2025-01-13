const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async ({ name, email, password }) => {
  email = email.toLowerCase();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password,10);
  console.log(`Hashed Password: ${hashedPassword}`);  // Log the hashed password
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return { name: newUser.name, email: newUser.email, id: newUser._id };
};

const loginUser = async ({ email, password }) => {
  try {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
console.log(`Entered password: ${password}`);
console.log(`Stored hashed password: ${user.password}`);
if (!isMatch) {
  throw new Error('Invalid credentials');
}

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    };
  } catch (error) {
    console.error("Login error: ", error.message);  // Add this line to log errors
    throw error;
  }
};

const getUserProfile = async (id) => {
  return await User.findById(id).select('-password');
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};