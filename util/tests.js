const jest = require("jest");
process.env.NODE_ENV = "test";

jest.run(["--verbose", "--coverage"]);
