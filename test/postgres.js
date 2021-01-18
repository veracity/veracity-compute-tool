const fs = require("fs");
const postgres = require("../cmds/postgres");

var assert = require("assert");
describe("postgres", function () {
  let result = "";

  const mockedLog = (message) => {
    if (result.length) {
      result += "\n";
    }
    result += message;
  };
  beforeEach(() => (console.log = mockedLog));

  describe("handler", function () {
    it("should create a postgres", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/postgres.yaml")
        .toString("utf-8");

      postgres.handler({
        namespace: "test",
        password: "test",
      });

      assert.strictEqual(
        snapshot,
        result.replace(
          /DATABASE_PASSWORD: .*/g,
          "DATABASE_PASSWORD: **secret**"
        )
      );
    });
  });
});
