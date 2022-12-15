const posts = require("../schemas/post");

// post 조회
const getAllPost = async (req, res) => {
  try {
    const posts = await posts.find({}).sort("-date").exec();
    res.json({
      posts,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// post 상세 페이지조회
const getDetail = async (req, res) => {
  try {
    const {
      params: { _id },
    } = req;
    const post = await posts.find({ _id: _id });
    res.status(200).render("detail", { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// post 생성
const CreatePost = async (req, res) => {
  const { title, postId, password, content } = req.body;
  //서울시간
  let date = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");

  await posts.create({
    title,
    postId,
    password,
    content,
    date,
  });
  res.json({ success: true });
};

// post 수정 페이지 로드
const UpdatePage = async (req, res) => {
  try {
    const {
      params: { _id },
    } = req;
    const post = await posts.find({ _id: _id });
    res.status(200).render("edit", { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// post 수정
const UpdatePost = async (req, res) => {
  const { _id } = req.params;
  const { postId, password, title, content } = req.body;
  const existsPost = await posts.find({ _id });
  if (!existsPost.length) {
    return res.status(400).json({
      success: false,
      errorMessage: { message: "데이터 형식이 올바르지 않습니다." },
    });
  }
  if (Number(password) !== Number(existsPost[0].password)) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀립니다." });
  }
  await Posts.updateOne({ _id }, { $set: { postId, title, content } });
  res.json({ success: true });
};

// post 삭제
const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const { password } = req.body;
    const existsPost = await posts.find({ _id });
    if (Number(password) === Number(existsPost[0].password)) {
      await posts.deleteOne({ _id });
      res.json({ success: true });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllPost,
  getDetail,
  CreatePost,
  UpdatePage,
  UpdatePost,
  deletePost,
};
