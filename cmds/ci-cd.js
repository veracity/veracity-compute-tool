const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/ci_cd.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");

exports.command = "cicd <repository> <builder>";
exports.desc = "create ci cd";
exports.builder = {};
exports.handler = function (argv) {
  var t = Handlebars.compile(template);
  // execute the compiled template and print the output to the console
  console.info("writing azure-pipelines.yaml");
  fs.appendFileSync("azure-pipelines.yaml", t(argv));
};
