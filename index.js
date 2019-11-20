const fs = require('fs')
let args = process.argv.slice(2)

//List of message codes
const LANG_SELECTED = 0
const LOCALE_SELECTED = 1
const LOCALE_ERROR = 2
const LOCALE_DEFAULTED = 3
const LOCALE_LIST = 4
const HELP_MSG = 5
const LANG_DEFAULTED = 6

if (args.length < 1) {
    console.log(`You may enter 'help' if you need assistance with the program.\nYou may also type 'lang=en' (or your prefered language) and 'loc=us' (or your prefered locale) to run the program with those options.`)
}
else if (args.length > 3) {
    console.log(`Too many inputs. Please type 'help' for assistance with the program.\nYou may also type 'lang=en' (or your prefered language) and 'loc=us' (or your prefered locale) to run the program with those options.`)
    process.exit()
}

//Default values
let lang = ''
let loc = ''
let needHelp = false

for (arg of args) {
    if (arg === 'help') needHelp = true
    if (arg.startsWith('lang=')) lang = arg.slice(5)
}

if (needHelp) {
    if (lang) {
        helpCall(lang)
        process.exit()
    }
    else {
        helpCall()
        process.exit()
    }
}
else {
    for (arg of args) {
        if (arg.startsWith('lang=')) lang = arg.slice(5)
        else if (arg.startsWith('loc=')) loc = arg.slice(4)
    }
}

if (lang && fs.statSync(lang).isDirectory()) {
    if (loc) {
        let msgFile = lang + `/` + loc + `.txt`
        if (fs.existsSync(msgFile)) {
            let msg = fs.readFileSync(msgFile).toString().split("\n")
            console.log(msg[LANG_SELECTED] + `\n` + msg[LOCALE_SELECTED])
        }
        else {
            let locales = fs.readdirSync(lang)
            msgFile = lang + `/` + locales[0]
            let msg = fs.readFileSync(msgFile).toString().split("\n")
            console.log(msg[LANG_SELECTED] + `\n` + loc.toUpperCase() + ` ` + msg[LOCALE_ERROR] + `\n` + msg[LOCALE_DEFAULTED])
        }
    }
    else {
        let locales = fs.readdirSync(lang)
        let msgFile = lang + '/' + locales[0]
        let msg = fs.readFileSync(msgFile).toString().split("\n")
        console.log(msg[LANG_SELECTED] + `\n` + msg[LOCALE_DEFAULTED])
    }
}
else {
    let msgFile = `en/us.txt`
    let msg = fs.readFileSync(msgFile).toString().split("\n")
    console.log(msg[LANG_DEFAULTED] + `\n` + msg[LOCALE_DEFAULTED])
}

function helpCall(helpLang) {
    if (helpLang) {
        if (fs.existsSync(helpLang) && fs.statSync(helpLang).isDirectory()) {
            let locales = fs.readdirSync(helpLang)
            let msgFile = helpLang + `/` + locales[0]
            let msg = fs.readFileSync(msgFile).toString().split("\n")
            console.log(`Language: ` + helpLang.toUpperCase() + `\n` + msg[HELP_MSG] + `\n-` + msg[LOCALE_LIST])
            for (let locale in locales) {
                console.log(`--` + locales[locale].slice(0, 2).toUpperCase())
            }
        }
        else console.log(`Invalid language option. Please type 'help' to list available languages.`)
    }
    else {
        fs.readdirSync('.').forEach(file => {
            if (file.length === 2) {
                helpCall(file)
            }
        })
    }
}