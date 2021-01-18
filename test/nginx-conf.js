const fs = require("fs");
const mockFs = require("mock-fs");
const nginxConf = require("../cmds/nginx-conf");

var assert = require("assert");
describe("ci-cd", function () {
  describe("handler", function () {
    it("should create azure pipelines", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/nginx.conf")
        .toString("utf-8");

      mockFs({
        "./test": {
          /* empty directory */
        },
      });
      nginxConf.handler({});

      assert.strictEqual(
        snapshot,
        fs.readFileSync("./nginx.conf").toString("utf-8")
      );

      mockFs.restore();
    });
  });
});
