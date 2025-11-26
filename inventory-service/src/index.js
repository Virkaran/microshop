const express = require("express");

const app = express();
app.use(express.json());

let inventory = { Laptop: 100, Mouse: 50, Headphones: 75 };

app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));
app.get("/api/v1/ready", (req, res) => res.json({ ready: true }));

app.get("/api/v1/inventory", (req, res) => res.json(inventory));

const PORT = process.env.PORT || 8002;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Inventory service running on port ${PORT}`));
}
module.exports = app;
