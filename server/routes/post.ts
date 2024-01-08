import express from "express";

const router = express.Router();

router.get("/post", (req, res) => res.json({ msg: "post" }));

export default router;
