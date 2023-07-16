// jest tests
// https://jestjs.io/docs/en/configuration.html
const config = require("../src/config");
const request = require("supertest");
const { app, listener } = require("../src/index");
const uuid = require("uuid");
let l = listener;
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the theme path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/theme");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the contact path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/contact");
    expect(response.statusCode).toBe(200);
  });
  test("It should be in html", async () => {
    const response = await request(app).get("/contact");
    expect(response.type).toBe("text/html");
  });

  // test("It should response the POST method", async () => {
  //     const response = await request(app).post("/contact")
  //     expect(response.statusCode).toBe(200)
  // })
  // test("It should be in html (post)", async () => {
  //     const response = await request(app).post("/contact")
  //     expect(response.type).toBe("text/html")
  // })
});
describe("test the request path", () => {
  test("It should response the POST method", async () => {
    const response = await request(app).post("/request");
    expect(response.statusCode).toBe(201);
  });
});

describe("POST /token", () => {
  test("It should response the POST method", async () => {
    const response = await request(app).post("/token");
    expect(response.statusCode).toBe(200);
  });
  test("It should be in json format", async () => {
    const response = await request(app).post("/token");
    expect(response.type).toBe("application/json");
  });
  test("It should have a token", async () => {
    const response = await request(app).post("/token");
    expect(response.body.token).toBeDefined();
  });
});
describe("404 Works (/uuid)", () => {
  const id = uuid.v4();
  test("GET /" + id, async () => {
    const response = await request(app).get(`/${id}`);
    expect(response.statusCode).toBe(404);
  });
  test("It should be in html", async () => {
    const response = await request(app).get(`/${id}`);
    expect(response.type).toBe("text/html");
  });
});
beforeAll(() => {
  l.close();
  l = app.listen(config.port);
});

afterAll((d) => {
  l.close(d);
});
