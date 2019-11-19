const fs = require('fs')
let args = process.argv.slice(2)

//List of message codes
const LANG_SELECTED = 0
const LOCALE_SELECTED = 1
const LOCALE_ERROR = 2
const HELP_MSG = 3

if (args.length < 1) {
    console.log(`You may enter 'help' if you need assistance with the program.\nYou may also type 'lang=en' (or your prefered language) and 'loc=us' (or your prefered locale) to run the program with those options.`)
    process.exit()
}
else if (args.length > 3) {
    console.log(`Too many inputs. Please type 'help' for assistance with the program.\nYou may also type 'lang=en' (or your prefered language) and 'loc=us' (or your prefered locale) to run the program with those options.`)
    process.exit()
}

//Default values
let lang = 'en'
let loc = 'us'

if (args[0] === 'help') {
    console.log(`Type 'lang=en' (or prefered language) and 'loc=us' (or your prefered locale) to run the program with those options.`)
    if (args[1] && args[1].startsWith('lang=')) {
        lang = args[1].slice(5)
        helpCall(lang)
    }
    else helpCall()
}

// let msgFile = lang + '/' + loc + '.txt'
// let msg = fs.readFileSync(msgFile).toString().split("\n")

function helpCall(helpLang) {
    if (helpLang) {
        if (fs.existsSync(helpLang) && fs.statSync(helpLang).isDirectory()) {
            console.log(`-Locales of %s:`, helpLang)
            let locales = fs.readdirSync(helpLang)
            for (let locale in locales) {
                console.log(`--` + locales[locale].slice(0, 2))
            }
        }
        else {
            console.log(`Invalid language option. Please type 'help' to list available languages.`)
            process.exit()
        }
    }
    else {
        fs.readdirSync('.').forEach(file => {
            if (file.length === 2) {
                console.log(`Language: ` + file)
                helpCall(file)
            }
        })
    }
}

//////////////////////////////////////////////////////////////////////

// //Language Handling Above
// if (lang) lang = lang.toUpperCase()
// else lang = 'No Selection'
// if (locale) locale = locale.toUpperCase()
// else locale = 'No Selection'
// let languages = ['ENGLISH', 'ESPANOL']
// let locales = [['US', 'UK'], ['MEX', 'SP']]
// let messages = [[`You have selected '%s' as your language.`, `You have selected '%s' as your locale.`,
//     `'%s' is not a valid locale option. Defaulting locale to '%s'.`], [`Ha selectado '%s' como su idioma.`,
//     `Ha selectado '%s' como su configuración regional.`,
//     `'%s' no es una opción de configuración regional válida. Configuración regional predeterminada a '%s'.`]]
// let langNum = 0
// let localeNum = 0
// let validLang = false
// let validLocale = false

// for (let num in languages) {
//     if (lang === languages[num]) {
//         langNum = num
//         validLang = true
//         break;
//     }
// }
// if (validLang === true) {
//     for (let num in locales[langNum]) {
//         if (locale === locales[langNum][num]) {
//             localeNum = num
//             validLocale = true
//             break;
//         }
//     }
// }
// if (validLang === true) {
//     console.log(messages[langNum][0], languages[langNum])
//     if (validLocale === true) console.log(messages[langNum][1], locales[langNum][localeNum])
//     else console.log(messages[langNum][2], locale, locales[langNum][localeNum])
// }
// else {
//     console.log(`'%s' is not a valid language option. Defaulting language to '%s' and locale to '%s'.`, lang, languages[langNum], locales[langNum][localeNum])
// }

// //Diskhog Logic Below
// let resultsFiles = []
// let resultsSizes = []
// let newResultsSizes = []

// const BLOCK_SIZE = 4096

// function getSize(curPath) { //This function will grab the size of the file or directory through recursively.
//     const stats = fs.statSync(curPath)
//     let totalSize = 0
//     if (!stats.isDirectory())
//         totalSize = stats.size

//     else {
//         let files = fs.readdirSync(curPath)
//         for (let i in files) {
//             let newPath
//             if (curPath[-1] === '/')
//                 newPath = curPath + files[i]
//             else
//                 newPath = curPath + '/' + files[i]
//             totalSize += getSize(newPath)
//         }
//     }

//     return totalSize
// }

// function getAllFiles(curPath) { //This function grabs all the files in order of printing and places their names and sizes in corresponding arrays.
//     resultsFiles.push(curPath)
//     resultsSizes.push(getSize(curPath))
//     const stats = fs.statSync(curPath)
//     if (stats.isDirectory()) {
//         let files = fs.readdirSync(curPath)
//         for (let i in files) {
//             let newPath = ''
//             if (curPath.toString().endsWith('/'))
//                 newPath = curPath + files[i]
//             else
//                 newPath = curPath + '/' + files[i]
//             getAllFiles(newPath)
//         }
//     }
// }

// function format() { //This function calls getAllFiles function and then formats the sizes into strings with corresponding tags (i.e. KB, MB, etc.)
//     getAllFiles(pathName)
//     for (let i = 0; i < resultsFiles.length; i++) {
//         let fileSize = resultsSizes[i]
//         let newSize = ''
//         if (fileSize > 1000000000000)
//             newSize = '(' + (Math.ceil(fileSize / BLOCK_SIZE) * 4) / 1000000000 + ' TB) '
//         else if (fileSize > 1000000000)
//             newSize = '(' + (Math.ceil(fileSize / BLOCK_SIZE) * 4) / 1000000 + ' GB) '
//         else if (fileSize > 1000000)
//             newSize = '(' + (Math.ceil(fileSize / BLOCK_SIZE) * 4) / 1000 + ' MB) '
//         else
//             newSize = '(' + (Math.ceil(fileSize / BLOCK_SIZE) * 4) + ' KB) '
//         newResultsSizes[i] = newSize
//     }

// }

// function main(curPath) { //This function is a print function that prints files and directories in corresponding groupings.
//     const stats = fs.statSync(curPath)
//     if (stats.isDirectory()) {
//         console.group(newResultsSizes.shift(), resultsFiles[0])
//         let files = fs.readdirSync(resultsFiles.shift())
//         for (let i in files) {
//             main(resultsFiles[0])
//         }
//         console.groupEnd()
//     }
//     else
//         console.log(newResultsSizes.shift(), resultsFiles.shift())
// }

// format()
// main(pathName)
