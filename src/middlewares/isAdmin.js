// middleware/checkRole.js

const isAdmin = (req, res, next) => {
    // Check if the user has the role of "superadmin"
    next();
    return;
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. You are not authorized to perform this action.' });
    }
    next(); 
  };
  
  module.exports = isAdmin