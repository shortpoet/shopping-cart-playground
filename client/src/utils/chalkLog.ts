
const inspect = require('util').inspect;
import chalk = require('chalk');

/*
https://github.com/chalk/chalk
Colors

  black
  red
  green
  yellow
  blue
  magenta
  cyan
  white
  blackBright (alias: gray, grey)
  redBright
  greenBright
  yellowBright
  blueBright
  magentaBright
  cyanBright
  whiteBright

Background colors

  bgBlack
  bgRed
  bgGreen
  bgYellow
  bgBlue
  bgMagenta
  bgCyan
  bgWhite
  bgBlackBright (alias: bgGray, bgGrey)
  bgRedBright
  bgGreenBright
  bgYellowBright
  bgBlueBright
  bgMagentaBright
  bgCyanBright
  bgWhiteBright

*/

export function chalkLog(chalkColor: chalk.Chalk, message: string) {
  console.log(chalkColor(`${inspect(message)}`))
}