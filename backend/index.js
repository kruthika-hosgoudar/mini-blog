const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  password: "postgres234", // change if needed
  host: "localhost",
  port: 5432,
  database: "postgres",
});

// ======================
// GET ALL POSTS
// ======================
app.get("/posts", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY id DESC"
  );
  res.json(result.rows);
});

// ======================
// CREATE POST
// ======================
app.post("/posts", async (req, res) => {
  const { title, description } = req.body;

  const result = await pool.query(
    "INSERT INTO posts (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );

  res.json(result.rows[0]);
});

// ======================
// UPDATE POST
// ======================
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const result = await pool.query(
    "UPDATE posts SET title=$1, description=$2 WHERE id=$3 RETURNING *",
    [title, description, id]
  );

  res.json(result.rows[0]);
});

// ======================
// DELETE POST
// ======================
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM posts WHERE id=$1", [id]);

  res.json({ message: "Deleted successfully" });
});

// ======================
// START SERVER
// ======================
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});