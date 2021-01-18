const fs = require("fs");
const mockFs = require("mock-fs");
const cicd = require("../cmds/ci-cd");

var assert = require("assert");
describe("ci-cd", function () {
  describe("handler", function () {
    it("should create azure pipelines", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/azure-pipelines.yaml")
        .toString("utf-8");

      mockFs({
        "./test": {
          /** empty directory */
        },
      });
      cicd.handler({
        repository: "maritime/inkubator-test-app",
        builder: "heroku/buildpacks:18",
      });

      assert.strictEqual(
        snapshot,
        fs.readFileSync("./azure-pipelines.yaml").toString("utf-8")
      );

      mockFs.restore();
    });
  });
});
