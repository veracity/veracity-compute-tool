const fs = require("fs");
const sessionManager = require("../cmds/session-manager");

var assert = require("assert");
describe("session_manager", function () {
  let result = "";

  const mockedLog = (message) => {
    if (result.length) {
      result += "\n";
    }
    result += message;
  };
  beforeEach(() => (console.log = mockedLog));

  describe("handler", function () {
    it("should create session manager", function () {
      const snapshot = fs
        .readFileSync("./test/snapshots/session-manager.yaml")
        .toString("utf-8");

      sessionManager.handler({
        releaseName: "mi-test-app-dev",
        host: "mi-test-app-dev.dnvgl.com",
        clientId: "590a78f9-7b48-415b-b6c2-6070d34fb710",
        clientSecret: "test",
        serviceId: "e44c14e2-de4a-45f3-b722-fde0df37bae3",
        subscriptionKey: "f542308317114ef1a6773fbe0c5155bc",
      });

      assert.strictEqual(
        snapshot,
        result.replace(/client-secret: .*/g, "client-secret: **secret**")
      );
    });
  });
});
