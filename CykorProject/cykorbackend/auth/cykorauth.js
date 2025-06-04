const jwt = require('jsonwebtoken');
const cykoruser = require('../model/cykoruser');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: '로그인 필요' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cykorsecret');
    const user = await cykoruser.findById(decoded.id);
    if (!user) return res.status(404).json({ message: '사용자 없음' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: '토큰 만료' });
  }
};
