const User = require('../models/user.model');
const Token = require('../models/token.model');
const tokenService = require('../services/token.service');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.isEmailTaken(email)) {
      return res.status(400).send({ message: 'Email already taken' });
    }
    const user = await User.create({ name, email, password, role });
    const tokens = await tokenService.generateAuthTokens(user);

    res.cookie('refreshToken', tokens.refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: tokens.refresh.expires,
    });

    res.status(201).send({ user, tokens: { access: tokens.access } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }
    const tokens = await tokenService.generateAuthTokens(user);

    res.cookie('refreshToken', tokens.refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: tokens.refresh.expires,
    });

    res.send({ user, tokens: { access: tokens.access } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await Token.findOneAndDelete({ token: refreshToken, type: 'refresh' });
    }
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send({ message: 'Refresh token not found' });
    }
    
    const tokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
    const user = await User.findById(tokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await tokenDoc.deleteOne();
    
    const tokens = await tokenService.generateAuthTokens(user);

    res.cookie('refreshToken', tokens.refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: tokens.refresh.expires,
    });

    res.send({ user, tokens: { access: tokens.access } });
  } catch (error) {
    res.status(401).send({ message: 'Please authenticate' });
  }
};

// Forgot/Reset password stubs
const forgotPassword = async (req, res, next) => {
  res.send({ message: 'Reset password link sent to your email.' });
};

const resetPassword = async (req, res, next) => {
  res.send({ message: 'Password has been reset successfully.' });
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword
};
