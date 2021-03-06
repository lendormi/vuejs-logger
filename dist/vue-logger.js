"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_levels_1 = require("./enum/log-levels");
var VueLogger = /** @class */ (function () {
    function VueLogger() {
        this.errorMessage = "Provided options for vuejs-logger are not valid.";
        this.logLevels = Object.keys(log_levels_1.LogLevels).map(function (l) { return l.toLowerCase(); });
    }
    VueLogger.prototype.install = function (Vue, options) {
        options = Object.assign(this.getDefaultOptions(), options);
        if (this.isValidOptions(options, this.logLevels)) {
            Vue.$log = this.initLoggerInstance(options, this.logLevels);
            Vue.prototype.$log = Vue.$log;
        }
        else {
            throw new Error(this.errorMessage);
        }
    };
    VueLogger.prototype.isValidOptions = function (options, logLevels) {
        if (!(options.logLevel && typeof options.logLevel === "string" && logLevels.indexOf(options.logLevel) > -1)) {
            return false;
        }
        if (options.stringifyArguments && typeof options.stringifyArguments !== "boolean") {
            return false;
        }
        if (options.showLogLevel && typeof options.showLogLevel !== "boolean") {
            return false;
        }
        if (options.showArgumentInTable && typeof options.showArgumentInTable !== "boolean") {
            return false;
        }
        if (options.separator && (typeof options.separator !== "string" || (typeof options.separator === "string" && options.separator.length > 3))) {
            return false;
        }
        if (typeof options.isEnabled !== "boolean") {
            return false;
        }
        return !(options.showMethodName && typeof options.showMethodName !== "boolean");
    };
    VueLogger.prototype.getMethodName = function () {
        var error = {};
        try {
            throw new Error("");
        }
        catch (e) {
            error = e;
        }
        // IE9 does not have .stack property
        if (error.stack === undefined) {
            return "";
        }
        var stackTrace = error.stack.split("\n")[3];
        if (/ /.test(stackTrace)) {
            stackTrace = stackTrace.trim().split(" ")[1];
        }
        if (stackTrace && stackTrace.indexOf(".") > -1) {
            stackTrace = stackTrace.split(".")[1];
        }
        return stackTrace;
    };
    VueLogger.prototype.initLoggerInstance = function (options, logLevels) {
        var _this = this;
        var logger = {};
        logLevels.forEach(function (logLevel) {
            if (logLevels.indexOf(logLevel) >= logLevels.indexOf(options.logLevel) && options.isEnabled) {
                logger[logLevel] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var methodName = _this.getMethodName();
                    var methodNamePrefix = options.showMethodName ? methodName + (" " + options.separator + " ") : "";
                    var logLevelPrefix = options.showLogLevel ? logLevel + (" " + options.separator + " ") : "";
                    var formattedArguments = options.stringifyArguments ? args.map(function (a) { return JSON.stringify(a); }) : args;
                    var logMessage = logLevelPrefix + " " + methodNamePrefix;
                    _this.printLogMessage(logLevel, logMessage, options.showArgumentInTable, formattedArguments);
                    return logMessage + " " + formattedArguments.toString();
                };
            }
            else {
                logger[logLevel] = function () { return undefined; };
            }
        });
        return logger;
    };
    VueLogger.prototype.printLogMessage = function (logLevel, logMessage, showArgumentInTable, formattedArguments) {
        if (typeof console[logLevel] === 'undefined') {
            throw new Error("This logLevel " + logLevel + " on vuejs-logger doesn't work.");
        }
        if (showArgumentInTable) {
            console[logLevel].apply(console, __spreadArrays([logMessage], formattedArguments));
            console.table(formattedArguments);
        }
        else {
            console[logLevel].apply(console, __spreadArrays([logMessage], formattedArguments));
        }
    };
    VueLogger.prototype.getDefaultOptions = function () {
        return {
            isEnabled: true,
            logLevel: log_levels_1.LogLevels.DEBUG,
            separator: "|",
            showArgumentInTable: false,
            showLogLevel: false,
            showMethodName: false,
            stringifyArguments: false,
        };
    };
    return VueLogger;
}());
exports.default = new VueLogger();
//# sourceMappingURL=vue-logger.js.map