// middleware/registervalidate.js
const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if required fields are present and not empty
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // createdAt is optional; if not provided, the model defaults it
  next();
};

module.exports = { validateRegister };