const fs = require('fs')
let [pathName, lang, locale] = process.argv.slice(2)

//Language Handling Above
if (lang) lang = lang.toUpperCase()
else lang = 'No Selection'
if (locale) locale = locale.toUpperCase()
else locale = 'No Selection'
let languages = ['ENGLISH', 'ESPANOL']
let locales = [['US', 'UK'], ['MEX', 'SP']]
let messages = [[`You have selected '%s' as your language.`, `You have selected '%s' as your locale.`,
    `'%s' is not a valid locale option. Defaulting locale to '%s'.`], [`Ha selectado '%s' como su idioma.`,
    `Ha selectado '%s' como su configuración regional.`,
    `'%s' no es una opción de configuración regional válida. Configuración regional predeterminada a '%s'.`]]
let langNum = 0
let localeNum = 0
let validLang = false
let validLocale = false

for (let num in languages) {
    if (lang === languages[num]) {
        langNum = num
        validLang = true
        break;
    }
}
if (validLang === true) {
    for (let num in locales[langNum]) {
        if (locale === locales[langNum][num]) {
            localeNum = num
            validLocale = true
            break;
        }
    }
}
if (validLang === true) {
    console.log(messages[langNum][0], languages[langNum])
    if (validLocale === true) console.log(messages[langNum][1], locales[langNum][localeNum])
    else console.log(messages[langNum][2], locale, locales[langNum][localeNum])
}
else {
    console.log(`'%s' is not a valid language option. Defaulting language to '%s' and locale to '%s'.`, lang, languages[langNum], locales[langNum][localeNum])
}

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
