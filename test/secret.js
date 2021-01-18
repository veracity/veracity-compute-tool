const fs = require("fs");
const secret = require("../cmds/secret");

var assert = require("assert");
describe("secret", function () {
  let result = "";

  const mockedLog = (message) => {
    if (result.length) {
      result += "\n";
    }
    result += message;
  };
  beforeEach(() => (console.log = mockedLog));

  describe("handler", function () {
    it("should create a secret", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/secret.yaml")
        .toString("utf-8");

      secret.handler({
        namespace: "testns",
        name: "test",
        key: "k",
        value: "v",
      });

      assert.strictEqual(snapshot, result.replace(/k: .*/g, "k: **secret**"));
    });
  });
});
