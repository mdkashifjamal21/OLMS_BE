require('dotenv').config();

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email, // optional, remove if not needed
    },
    process.env.JWT_SECRET, // must be defined in your .env file
    {
      expiresIn: "7d", // token valid for 7 days
    }
  );
};

module.exports = generateToken;
