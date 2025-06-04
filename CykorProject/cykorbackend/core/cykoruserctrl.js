const cykoruser = require('../model/cykoruser');
const jwt = require('jsonwebtoken');

exports.reg = async (req, res) => {
  const { username, password } = req.body;
  try {
    await cykoruser.create({ username, password });
    res.json({ message: '회원가입 성공' });
  } catch (err) {
    res.status(400).json({ message: '아이디 중복' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await cykoruser.findOne({ username });
  if (!user) return res.status(404).json({ message: '아이디 확인' });
  const valid = await user.comparePassword(password);
  if (!valid) return res.status(401).json({ message: '비밀번호 확인' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'cykorsecret', { expiresIn: '1h' });
  res.json({ token, username: user.username });
};

exports.me = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: '로그인 필요' });
  res.json({ username: req.user.username });
};
