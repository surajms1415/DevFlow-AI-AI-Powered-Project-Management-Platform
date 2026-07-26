const User = require('../models/user.model');

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const isMatch = await user.isPasswordMatch(req.body.currentPassword);
    if (!isMatch) {
      return res.status(400).send({ message: 'Incorrect current password' });
    }
    user.password = req.body.newPassword;
    await user.save();
    res.send({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

const updatePreferences = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { theme: req.body.theme, notificationPreferences: req.body.notificationPreferences },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const isMatch = await user.isPasswordMatch(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Incorrect password' });
    }
    await User.findByIdAndDelete(req.user._id);
    res.send({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  updatePassword,
  updatePreferences,
  deleteAccount,
};
