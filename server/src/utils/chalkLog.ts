const chalk = require('chalk')
import {inspect} from 'util'

// const _log  = () => Function.prototype.bind.call(console.log, console, 'LOG_ALIAS')

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

export const chalkLog = (color, message) => console.log(chalk[`${color}`](`${inspect(message)}`))
