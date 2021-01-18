const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/secret.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");
const { spawnSync } = require("child_process");

exports.command = "s <namespace> <name> <key> <value>";
exports.desc = "create secret";
exports.builder = {};
exports.handler = function (argv) {
  const buff = Buffer.from(argv.value, "utf-8");
  argv.value = buff.toString("base64");

  var t = Handlebars.compile(template);

  const kubeseal = spawnSync(
    "kubeseal",
    ["-o", "yaml", "--cert", "./certs/dev02.pem"],
    {
      input: t(argv),
    }
  );

  if (kubeseal.status === 0) {
    console.log(kubeseal.stdout.toString("utf-8"));
  } else {
    console.log(kubeseal.stderr.toString("utf-8"));
  }
};
