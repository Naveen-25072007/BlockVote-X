import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello BlockVote!");
});

app.listen(5000, () => {
  console.log("✅ Test server running on http://127.0.0.1:5000");
});