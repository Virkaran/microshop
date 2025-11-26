const express = require("express");

const app = express();
app.use(express.json());

let orders = [];

app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));
app.get("/api/v1/ready", (req, res) => res.json({ ready: true }));

app.post("/api/v1/orders", (req, res) => {
  const { userId, item, quantity } = req.body;
  if (!userId || !item || typeof quantity !== "number") {
    return res.status(400).json({ error: "userId, item, quantity are required" });
  }
  const order = { id: orders.length + 1, userId, item, quantity };
  orders.push(order);
  res.status(201).json(order);
});

app.get("/api/v1/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

const PORT = process.env.PORT || 8081;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Orders service running on port ${PORT}`));
}
module.exports = app;
