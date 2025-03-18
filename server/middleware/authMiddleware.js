const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.user = user;

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: `Access denied. Requires ${allowedRoles.join(' or ')} role.` });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};

module.exports = authMiddleware;
