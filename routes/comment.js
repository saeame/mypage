import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).send("GET: / comment");
});
router.post("/", (req, res) => {
  res.status(201).send("POST: / comment");
});
router.put("/", (req, res) => {
  res.status(201).send("PUT: / comment/:id");
});
router.delete("/", (req, res) => {
  res.status(201).send("DELETE: / comment/:id");
});

export default router;
