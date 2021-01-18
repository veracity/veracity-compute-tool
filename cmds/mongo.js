const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/mongo.hbs"),
  "utf8"
);

const secretTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/secret.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");
const { spawnSync } = require("child_process");

exports.command = "m <namespace> <password>";
exports.desc = "create mongo";
exports.builder = {};
exports.handler = function (argv) {
  const secretArg = {};

  const buff = Buffer.from(argv.password, "utf-8");
  secretArg.namespace = argv.namespace;
  secretArg.name = "mongo-secret";
  secretArg.key = "mongodb-root-password";
  secretArg.value = buff.toString("base64");

  var secretTransform = Handlebars.compile(secretTemplate);

  const kubeseal = spawnSync(
    "kubeseal",
    ["-o", "yaml", "--cert", "./certs/dev02.pem"],
    {
      input: secretTransform(secretArg),
    }
  );

  if (kubeseal.status === 0) {
    console.log(kubeseal.stdout.toString("utf-8"));
  } else {
    console.log(kubeseal.stderr.toString("utf-8"));
  }

  var t = Handlebars.compile(template);
  // execute the compiled template and print the output to the console
  console.log(t(argv));
};
