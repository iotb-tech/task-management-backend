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
    res.status(200).json({ response: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUserProfile(userId, updateData);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error"})
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserProfile(userId);
    if(!user) {
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error"})
  }
}

const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await userService.logoutUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { register, login, updateProfile, getProfile, logout };
