const XLSX = require('xlsx')
const Excel = require('exceljs')

//const shoppingXlsxFilePath = 'tests/xlsxReading/data/ShoppingApparels.xlsx'
const filename = './testsInitialData/Boardeffect_sampleTest.xlsx'
const boardeffectWorkbook = XLSX.readFile(filename)
const amersBlogs = boardeffectWorkbook.Sheets['AMERS_blogs']
const amersBlogsJson = XLSX.utils.sheet_to_json(amersBlogs)
const amersBlogsList = amersBlogsJson.map(row => row['AMERS'])

let sheetNames = boardeffectWorkbook.SheetNames

console.log(sheetNames)


