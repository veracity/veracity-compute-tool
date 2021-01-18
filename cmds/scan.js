const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/scan.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");

exports.command = "sc";
exports.desc = "create scan";
exports.builder = {};
exports.handler = function (argv) {
  var t = Handlebars.compile(template);
  // execute the compiled template and print the output to the console
  console.info("writing scan.sh");
  fs.appendFileSync("scan.sh", t(argv));
};
