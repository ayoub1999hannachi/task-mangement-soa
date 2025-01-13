const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login User
// Login User
exports.login = async (req, res) => {
    try {
      console.log(req.body);  // Log the login credentials
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token, userId: user._id });  // Return userId along with token
    } catch (error) {
      console.log(error);  // Log any error
      res.status(500).json({ error: error.message });
    }
  };
  

  

// Get Profile
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Profile without token
exports.profileWithoutToken = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
