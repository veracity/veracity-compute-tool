const fs = require("fs");
const grafana = require("../cmds/grafana");

var assert = require("assert");
describe("grafana", function () {
  let result = "";

  const mockedLog = (message) => {
    if (result.length) {
      result += "\n";
    }
    result += message;
  };
  beforeEach(() => (console.log = mockedLog));

  describe("handler", function () {
    it("should create a grafana", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/grafana.yaml")
        .toString("utf-8");

      grafana.handler({
        namespace: "test",
        host: "test",
      });

      assert.strictEqual(snapshot, result);
    });
  });
});
