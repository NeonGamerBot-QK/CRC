const config = require("../src/config");
describe("NULL or NOT NULL", () => {
  test("myEmail", () => {
    let prop = config.myEmail;
    let isValid = true;
    // console.log(prop);
    if (prop === undefined || typeof prop === "string") isValid = null;
    expect(isValid).toBeNull();
  });
});
describe("emailConfig", () => {
  test("host", () => {
    let prop = config.emailConfig.host;
    let isValid = true;
    if (prop === undefined || typeof prop === "string") isValid = null;
    expect(isValid).toBeNull();
  });
  test("port", () => {
    let prop = config.emailConfig.port;
    let isValid = true;
    if (prop === undefined || typeof prop === "number") isValid = null;
    expect(isValid).toBeNull();
  });
  test("username", () => {
    let prop = config.emailConfig.username;
    let isValid = true;
    if (prop === undefined || typeof prop === "string") isValid = null;
    expect(isValid).toBeNull();
  });
  test("password", () => {
    let prop = config.emailConfig.password;
    let isValid = true;
    if (prop === undefined || typeof prop === "string") isValid = null;
    expect(isValid).toBeNull();
  });
});
describe("DEFAULTS OR NOT", () => {
  test("dbPath", () => {
    expect(config.dbPath).not.toBeNull();
  });
  test("password", () => {
    expect(config.password).not.toBeNull();
  });
  test("port", () => {
    expect(config.port).not.toBeNull();
  });
});
