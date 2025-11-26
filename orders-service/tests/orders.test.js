const request = require("supertest");
const app = require("../src/index");

describe("Orders Service", () => {
  it("should return health ok", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("should create and fetch an order", async () => {
    const create = await request(app).post("/api/v1/orders").send({ userId: 1, item: "Laptop", quantity: 2 });
    expect(create.statusCode).toBe(201);
    const order = create.body;
    const get = await request(app).get(`/api/v1/orders/${order.id}`);
    expect(get.statusCode).toBe(200);
    expect(get.body.item).toBe("Laptop");
  });
});
