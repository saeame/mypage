import express from "express";
const connect = require("./schemas");
const app = express();

const postsRouter = require("./routes/post");
// 콘솔 창에 어떤 요청이 있는지에 대해서 보여줌
const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};
// 바디 제이슨
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestMiddleware);

// ejs view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//정적파일
app.use(express.static("./views"));

// post 라우터 사용
app.use("/", [postsRouter]);

// home 페이지 렌더링
app.get("/", (req, res) => {
  res.render("board");
});

// post 페이지 연결
app.get("/post", (req, res) => {
  res.render("post");
});

// 콘솔 창에 알림
app.listen(3000, () => {
  console.log(port, "서버가 켜졌습니다.");
});
