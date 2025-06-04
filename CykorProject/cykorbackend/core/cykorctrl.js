const cykorpost = require('../model/cykorpost');

exports.read = async (req, res) => {
  const posts = await cykorpost.find().populate('author', 'username');
  res.json(posts);
};

exports.add = async (req, res) => {
  const { title, content } = req.body;
  if (!req.user) return res.status(401).json({ message: '로그인 필요' });
  const post = new cykorpost({ title, content, author: req.user._id });
  await post.save();
  res.json(post);
};

exports.edit = async (req, res) => {
  const { title, content } = req.body;
  if (!req.user) return res.status(401).json({ message: '로그인 필요' });
  const post = await cykorpost.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    { title, content },
    { new: true }
  );
  if (!post) return res.status(404).json({ message: '권한 없음' });
  res.json(post);
};

exports.del = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: '로그인 필요' });
  const post = await cykorpost.findOneAndDelete({ _id: req.params.id, author: req.user._id });
  if (!post) return res.status(404).json({ message: '권한 없음' });
  res.json({ message: '삭제 완료' });
};
