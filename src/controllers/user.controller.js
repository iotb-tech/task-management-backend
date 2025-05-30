const userService = require('../services/user.service');
const register = async (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);
    if (!data || !data.email || !data.password || !data.full_name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = await userService.registerUser(data);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await userService.loginUser(email, password);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
