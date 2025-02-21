const { generateSalt, hashPassword, verifyPassword } = require('../helpers/Hashing.helper.js');
const User = require('../models/User.model.js');
const jwt = require('jsonwebtoken');


// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const findUser = await User.findOne({email});
    
    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    
    // Assuming findUser has a stored hashed password
    const isMatch = await verifyPassword(findUser.password, password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = createToken(findUser)
    res.status(200).json({ findUser, token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};



// Function to create a JWT token
function createToken(user) {
  // Sample payload (you can add more fields as needed)
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  // Create the token (expires in 1 hour)
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}


module.exports = {
  loginUser
};
