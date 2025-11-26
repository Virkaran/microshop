const request = require("supertest");
const app = require("../src/index");

describe("Inventory Service", () => {
  it("should return health ok", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("should list and update inventory", async () => {
    const list = await request(app).get("/api/v1/inventory");
    expect(list.statusCode).toBe(200);
    const update = await request(app).post("/api/v1/inventory").send({ item: "Keyboard", quantity: 10 });
    expect(update.statusCode).toBe(200);
    expect(update.body.mango).toBe(10);
  });
});
