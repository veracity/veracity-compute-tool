const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../templates/nginx_conf.hbs"),
  "utf8"
);

const Handlebars = require("handlebars");

exports.command = "nc";
exports.desc = "create nginx config";
exports.builder = {};
exports.handler = function (argv) {
  var t = Handlebars.compile(template);
  // execute the compiled template and print the output to the console
  console.info("writing nginx.conf");
  fs.appendFileSync("nginx.conf", t(argv));
};
