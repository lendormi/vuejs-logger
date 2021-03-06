import {notStrictEqual, strictEqual} from "assert";
import chai from "chai";
import Vue from "vue/dist/vue.min";
import VueLogger from "../src/index";
import {LogLevels} from "../src/enum/log-levels";
import {ILoggerOptions} from "../src/interfaces/logger-options";
const expect = chai.expect;

describe("vue-logger.ts", () => {

    test("install() should work as expected with the correct params.", () => {
        const options: ILoggerOptions = {
            isEnabled: true,
            logLevel: LogLevels.ERROR,
            separator: "|",
            stringifyArguments: false,
            showArgumentInTable: false,
            showLogLevel: false,
            showMethodName: false,
        };
        Vue.use(VueLogger, options);
        expect(Vue.$log).to.be.a("object");
        strictEqual(Vue.$log.debug("debug"), undefined);
        strictEqual(Vue.$log.info("info"), undefined);
        strictEqual(Vue.$log.log("log"), undefined);
        strictEqual(Vue.$log.warn("warn"), undefined);
        expect(Vue.$log.error("error")).to.exist;
    });

    test("install() should throw an error with the an incorrect parameter.", () => {
        const options: any = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            separator: "|",
            stringifyArguments: false,
            showArgumentInTable: false,
            showLogLevel: false,
            showMethodName: "wrong value for test.",
        };
        expect(() => {
            VueLogger.install(Vue, options);
        })
            .to
            .throw(Error, "Provided options for vuejs-logger are not valid.");
    });
});
