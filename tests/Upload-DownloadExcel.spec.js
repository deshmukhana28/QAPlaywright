const {test, expect} = require('@playwright/test');
const ExcelJs = require('exceljs');

//task3: Replace/write the value by traversing
async function writeValueByTraversing(searchText, replacedValue, change, filePath)
{
// workbook conent all sheets: Sheet1, Sheet2, Sheet3,...
const workbook = new ExcelJs.Workbook();
// read excel file
await workbook.xlsx.readFile(filePath)
// Sheet1 selection from Workbook
const worksheet = workbook.getWorksheet('Sheet1');
// print all the value
const output = await readExcel(worksheet, searchText);
const cell = worksheet.getCell(output.row, output.column+change.colChange);
cell.value= replacedValue;
await workbook.xlsx.writeFile(filePath);
}
//Reusablecode: ReadExcel
async function readExcel(worksheet, searchText)
{
let output = {row:-1, column:-1};
// print all the value
worksheet.eachRow((row, rowNumber)=>{
    row.eachCell((cell, colNumber)=>{
        if(cell.value === searchText){
            output.row = rowNumber;
            output.column = colNumber;
            console.log(rowNumber, colNumber);
        }
    })
})
return output;
}
// _____________________________________________________________________________________________________________________________________________________________
test('upload download excel validation', async ({page})=>
{
    const textSearch = 'Mango';
    const updateValue = '350';
    const filePath = "C:/Users/rushi/Downloads/download.xlsx";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
//click on download 
    await page.locator("#downloadButton").click();
//wait for download event
    const download = await downloadPromise;
//save excel file 
    await download.saveAs(filePath);
//Read Excel using ExcelJS -> Find Mango Coordinates -> Update Column + 2  -> Write Excel File
    await writeValueByTraversing(textSearch, updateValue, {rowChange:0, colChange:2}, filePath);
//Upload Modified File
    await page.locator("#fileinput").setInputFiles(filePath);
//Validate Updated Value
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has :textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})

