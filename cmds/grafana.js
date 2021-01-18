const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/grafana.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");

exports.command = "g <namespace> <host>";
exports.desc = "create grafana";
exports.builder = {};
exports.handler = function (argv) {
  var t = Handlebars.compile(template);
  // execute the compiled template and print the output to the console
  console.log(t(argv));
};
