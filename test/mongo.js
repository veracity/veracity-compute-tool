const fs = require("fs");
const mongo = require("../cmds/mongo");

var assert = require("assert");
describe("mongo", function () {
  let result = "";

  const mockedLog = (message) => {
    if (result.length) {
      result += "\n";
    }
    result += message;
  };
  beforeEach(() => (console.log = mockedLog));

  describe("handler", function () {
    it("should create a mongo", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/mongo.yaml")
        .toString("utf-8");

      mongo.handler({
        namespace: "test",
        password: "test",
      });

      assert.strictEqual(
        snapshot,
        result.replace(
          /mongodb-root-password: .*/g,
          "mongodb-root-password: **secret**"
        )
      );
    });
  });
});
