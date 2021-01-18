const fs = require("fs");
const mockFs = require("mock-fs");
const scan = require("../cmds/scan");

var assert = require("assert");
describe("scan", function () {
  describe("handler", function () {
    it("should create scan", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/scan.sh")
        .toString("utf-8");

      mockFs({
        "./test": {
          /** empty directory */
        },
      });
      scan.handler();

      assert.strictEqual(
        snapshot,
        fs.readFileSync("./scan.sh").toString("utf-8")
      );

      mockFs.restore();
    });
  });
});
