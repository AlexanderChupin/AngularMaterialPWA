import {Injectable} from '@angular/core';
import {LogLevel} from './logger.service.enum';
import {environment} from '../../environments/environment';

/**
 * @description Logger service for environment logging.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private static level: LogLevel = LogLevel.DEBUG;

  public static debug(...message: any): void {
    LoggerService.writeToLog(LogLevel.DEBUG, ...message);
  }

  public static log(...message: any) {
    LoggerService.writeToLog(LogLevel.INFO, ...message);
  }

  public static warn(...message: any) {
    LoggerService.writeToLog(LogLevel.WARN, ...message);
  }

  public static error(...message: any) {
    LoggerService.writeToLog(LogLevel.ERROR, ...message);
  }

  /**
   * Should write the log?
   */
  private static shouldLog(level: LogLevel): boolean {
    return (level >= LogLevel[environment.LOG_LEVEL]);
  }

  /**
   * Write logs.
   */
  private static writeToLog(level: LogLevel, ...message: any) {
    if (this.shouldLog(level)) {
      if (level <= LogLevel.INFO) {
        console.log(LoggerService.getLogDate(), ...message);
      } else if (level === LogLevel.ERROR) {
        console.error(LoggerService.getLogDate(), ...message);
      } else if (level === LogLevel.WARN) {
        console.warn(LoggerService.getLogDate(), ...message);
      }
    }
  }
  // ALC. [text formatting \- How to output numbers with leading zeros in JavaScript? \- Stack Overflow](https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript)
  static _pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
  /**
   * To add the date on logs.
   */
  static getLogDate(): string {
    const date = new Date();
    return '[' +
      date.getFullYear() + '-' +
      this._pad(date.getMonth() + 1, 2) + '-' +
      this._pad(date.getDate(),2) + ' ' +
      this._pad(date.getHours(),2) + ':' +
      this._pad(date.getMinutes(),2) + ':' +
      this._pad(date.getSeconds(),2) + '.' +
      this._pad(date.getMilliseconds(),3) + ']';
  }
}
