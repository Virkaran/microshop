const express = require("express");

const app = express();
app.use(express.json());

let users = [];

app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));
app.get("/api/v1/ready", (req, res) => res.json({ ready: true }));

app.post("/api/v1/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.get("/api/v1/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Users service running on port ${PORT}`));
}
module.exports = app;
