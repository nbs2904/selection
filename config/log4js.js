const log4js = require("log4js");

// TODO move file into folder config/log4js
// TODO move other config files into folder config

const NODE_ENV = process.env.NODE_ENV || "dev";
let LOG_LEVEL = "DEBUG";
if (NODE_ENV === "prod") LOG_LEVEL = "ERROR";
else if (NODE_ENV === "test") LOG_LEVEL = "OFF";

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
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        server: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        simulation: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        cell: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        color: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        genome: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        node: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        },
        utils: {
            appenders: [ "out" ],
            level: LOG_LEVEL
        }
    }
});

module.exports = {
    server: log4js.getLogger("server"),
    simulation: log4js.getLogger("simulation"),
    cell: log4js.getLogger("cell"),
    color: log4js.getLogger("color"),
    genome: log4js.getLogger("genome"),
    node: log4js.getLogger("node"),
    utils: log4js.getLogger("utils")
};