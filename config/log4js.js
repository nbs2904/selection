const log4js = require("log4js");

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
            level: "DEBUG"
        },
        server: {
            appenders: ["out"],
            level: "DEBUG"
        },
        simulation: {
            appenders: ["out"],
            level: "DEBUG"
        },
        cell: {
            appenders: ["out"],
            level: "DEBUG"
        },
        genome: {
            appenders: ["out"],
            level: "DEBUG"
        },
        node: {
            appenders: ["out"],
            level: "DEBUG"
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