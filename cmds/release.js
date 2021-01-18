const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/release.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");

exports.command =
  "r <namespace> <releaseName> <host> <repository> <tag> <port>";
exports.desc = "create veracity release";
exports.builder = {};
exports.handler = function (argv) {
  var t = Handlebars.compile(template);
  // execute the compiled template and print the output to the console
  console.log(t(argv));
};
