import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey1234';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // adds .id
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
