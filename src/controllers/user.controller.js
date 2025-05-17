const userService = require('../services/user.service');
const register = async (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);
    if (!data || !data.email || !data.password || !data.full_name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = await userService.registerUser(data);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register };
