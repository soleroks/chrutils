const directives = require("../../config/chariotDirectives.json");
const config = require("../../config/ayarlar.json");
const { currentTime } = require("./chariot@time");
class Baselogger {
  constructor(log = "") {
    this.log = log;
  }
  async format(level, message) {
    const timestamp = (await currentTime()).current;
    const context = this.log ? `[BASELOGGER] : ${this.log}` : "";
    return `${timestamp} ${context} [${level.toUpperCase()}] - ${message}`;
  }

  out(message) {
    console.log(this.format("info", message));
  }
  alert(message) {
    console.alert(this.format("warn", message));
  }
  native_error(message) {
    console.error(this.format("error", message));
  }
  dev(message) {
    console.debug(this.format("debug", message));
  }
}
module.exports = Baselogger;
