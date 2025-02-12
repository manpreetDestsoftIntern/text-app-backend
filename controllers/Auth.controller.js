const { generateSalt, hashPassword, verifyPassword } = require('../helpers/Hashing.helper.js');
const { User } = require('../models/User.model.js');


// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    
    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    
    // Assuming findUser has a stored hashed password
    const isMatch = await verifyPassword(findUser.password, password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ findUser ,message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

module.exports = {
  loginUser
};
