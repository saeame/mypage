import express from "express";
const router = express.Router();

const {
  getAllPost,
  getDetail,
  CreatePost,
  UpdatePage,
  UpdatePost,
  deletePost,
} = require("../controllers/postController");

// Articles 전체 목록 조회
router.get("/articles", getAllPost);

// Articles 상세 페이지 조회
router.get("/articles/:_id", getDetail);

// Article 생성
router.post("/post", CreatePost);

// Article 수정 페이지 로드
router.get("/edit/:_id", UpdatePage);

// Article 수정
router.put("/articles/edit/:_id", UpdatePost);

// Article 삭제
router.delete("/articles/delete/:_id", deletePost);

module.exports = router;
