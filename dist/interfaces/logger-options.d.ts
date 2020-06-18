import { LogLevels } from "../enum/log-levels";
export interface ILoggerOptions {
    isEnabled: boolean;
    logLevel: LogLevels;
    separator: string;
    showArgumentInTable: boolean;
    showLogLevel: boolean;
    showMethodName: boolean;
    stringifyArguments: boolean;
}
