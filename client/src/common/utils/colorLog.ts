// const _log  = () => Function.prototype.bind.call(console.log, console, 'LOG_ALIAS')

type Options = {
  color: string;
  background: string;
}

// https://www.w3schools.com/colors/colors_names.asp

export function colorLog(message: any, options?: number, debug?: boolean): void;
export function colorLog(message: any, options?: (number | Options), debug?: boolean): void {
  let color;
  let background;
  const _options: Options = {} as Options
  if (debug == false) {
    return
  }
  // use strict null check double bang to account for !0 being true
  // but then !!1 is true
  if (options == null) {
    _options.color = "magenta";
    _options.background = "yellow";
    options = _options;
  }
  if (typeof options == "object") {
    color = options.color;
    background = options.background;
  } else if (typeof options == "number") {
    switch (options) {
      case 1:
        color = "green";
        background = "yellow";
        break;
        
        default:
          color = "magenta";
          background = "yellow";
          break;
        }
      }
      
  // https://stackoverflow.com/a/37081135/12658653
  if(process.env.NODE_ENV != 'production') {
    const e = new Error();
    if (!e.stack)
    try {
      // IE requires the Error to actually be thrown or else the 
      // Error's 'stack' property is undefined.
      throw e;
        } catch (e) {
            if (!e.stack) {
              return; // IE < 10, likely
            }
    }
          // eslint-disable-next-line
          const stack = e.stack!.toString().split(/\r\n|\n/);
          if (message === '') {
            message = '""';
    }
    // message = `${message}\n${stack[1]}`
    
    // console.log(`%c` + `${message}`, `color:` + `${color};background:${background}`)
    const trace = stack[1] ? stack[1].split('src/') : null;
    // const file = trace[1].match(/(.+?):/)[1]
    if (trace) {
      // eslint-disable-next-line
      const file = trace[1] ? trace[1].match(/.+?(?=:)/)![0] : null;
      // const line = trace[1].match(/:(.*)/)[1]
      // const line = trace[1].match(/(?<=:).*/)[0]
      // eslint-disable-next-line
      const line = trace[1] ? trace[1].match(/(:.*)/)![0] : null;
      if (typeof message == 'string' || typeof message == 'number') {
        console.log(`%c${message}%c\t\t\t\t\t${file}%c${line}`, `color:${color};background:${background}`, `color:#003EC5;background:white;text-align:right;` ,`color:#0086E1;background:white;text-align:right;`)
      } else if (typeof message == 'object') {
        console.log(`%c${JSON.stringify(message)}%c\t\t\t\t\t${file}%c${line}`, `color:${color};background:${background}`, `color:#003EC5;background:white;text-align:right;` ,`color:#0086E1;background:white;text-align:right;`)
      }
    }
  } else {
    if (typeof message == 'string' || typeof message == 'number') {
      console.log(`%c` + `${message}`, `color:` + `${color};background:${background}`)
    } else if (typeof message == 'object') {
      console.log(`%c` + `${JSON.stringify(message)}`, `color:` + `${color};background:${background}`)
    }
  }
  
}

// module.exports =  {
  //   log,
  //   colorLog
// }
