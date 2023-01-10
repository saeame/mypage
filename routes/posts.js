const express = require('express');
const router = express.Router();
const Post = require('../schema/post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().select('-password');
    res.json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { user, title, content, password } = req.body;
  try {
    const post = await Post.create({
      user,
      title,
      content,
      password,
    });
    res.json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).select('-password');
    res.json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  if (!req.body || !id) {
    return res.json({ message: '데이터의 형식이 올바르지 않습니다' });
  }

  const { user, title, content, password } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    return res.json({ message: '게시글 조회에 실패했습니다' });
  }

  const isPasswordCorrect = post.password === password;

  if (isPasswordCorrect) {
    if (user) {
      post.user = user;
    }
    if (title) {
      post.user = title;
    }
    if (content) {
      post.user = content;
    }
    try {
      const updatePost = await post.save();
      res.json({ data: updatePost });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: '비밀번호가 틀립니다' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const post = await Post.findById(id);
  if (!post) {
    return res.json({ message: '게시글 조회에 실패하였습니다' });
  }

  const isPasswordCorrect = post.password === password;

  if (isPasswordCorrect) {
    try {
      await post.remove();
      res.json({ message: '게시글을 삭제하였습니다' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: '비밀번호가 틀립니다' });
  }
});

module.exports = router;
