const fs = require("fs");
const release = require("../cmds/release");

var assert = require("assert");
describe("release", function () {
  let result = "";

  const mockedLog = (message) => {
    if (result.length) {
      result += "\n";
    }
    result += message;
  };
  beforeEach(() => (console.log = mockedLog));

  describe("handler", function () {
    it("should create a release", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/release.yaml")
        .toString("utf-8");

      release.handler({
        namespace: "testns",
        releaseName: "testrelease",
        host: "testhost",
        repository: "testrepo",
        tag: "testtag",
        port: 80,
      });

      assert.strictEqual(snapshot, result);
    });
  });
});
