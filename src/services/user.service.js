const { generateAccessToken, generateRefreshToken } = require('../helpers/token.helpers');
const User = require('../models/User');

const registerUser = async (data) => {
  try {
    if (!data.email || !data.password || !data.full_name) {
      return {
        success: false,
        error: true,
        status: 400,
        message: 'Missing required fields',
      };
    }
    if (data.password.length < 6) {
      return {
        success: false,
        error: true,
        status: 400,
        message: 'Password must be at least 6 characters long',
      };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        success: false,
        error: true,
        status: 400,
        message: 'Invalid email format',
      };
    }

    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      return {
        success: false,
        error: true,
        status: 400,
        message: 'User already exists',
      };
    }
    const newUser = new User({
      email: data.email,
      password: data.password,
      full_name: data.full_name,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Error registering user');
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    user.refresh_token = refreshToken;
    await user.save();

    const userData = {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      occupation: user.occupation,
      profile_picture: user.profile_picture,
    };

    const response = {
      success: true,
      error: false,
      status: 200,
      message: "User login in successfully",
      user: userData,
      accessToken,
      refreshToken,
    };
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Error logging in user');
  }
};

const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};
const updateUserProfile = async (userId, data) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.full_name = data.full_name || user.full_name;
    user.phone = data.phone || user.phone;
    user.address = data.address || user.address;
    user.city = data.city || user.city;
    user.state = data.state || user.state;
    user.occupation = data.occupation || user.occupation;
    user.profile_picture = data.profile_picture || user.profile_picture;
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};

const logoutUser = async (userId, refresh_token) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.refresh_token !== refresh_token) {
      throw new Error('Invalid refresh token');
    }
    user.refresh_token = null;
    return { message: 'User logged out successfully' };
  } catch (error) {
    throw new Error('Error logging out user');
  }
};
const deleteUserAccount = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.remove();
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  deleteUserAccount,
};
