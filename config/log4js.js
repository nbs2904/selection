const log4js = require("log4js");
require("dotenv").config({path: ".env"});

const NODE_ENV = process.env.NODE_ENV || "dev";
const LOG_LEVEL = NODE_ENV === "prod" ? "WARN" : "DEBUG"; 

log4js.configure({
    appenders: {
        out: {
            type: "console",
            layout: {
                type: "pattern",
                pattern: "\u001b[38;5;245m[%d{hh:mm:ss}]\u001b[0m \u001b[38;5;30m[%-6.6c]\u001b[0m %[[%-5p]%] - %m"
            }
        }
    },
    categories: {
        default: {
            appenders: ["out"],
            level: LOG_LEVEL
        },
        server: {
            appenders: ["out"],
            level: LOG_LEVEL
        },
        simulation: {
            appenders: ["out"],
            level: LOG_LEVEL
        },
        cell: {
            appenders: ["out"],
            level: LOG_LEVEL
        },
        genome: {
            appenders: ["out"],
            level: LOG_LEVEL
        },
        node: {
            appenders: ["out"],
            level: LOG_LEVEL
        }
    }
});

module.exports = {
    server: log4js.getLogger("server"),
    simulation: log4js.getLogger("simulation"),
    cell: log4js.getLogger("cell"),
    genome: log4js.getLogger("genome"),
    node: log4js.getLogger("node")
};