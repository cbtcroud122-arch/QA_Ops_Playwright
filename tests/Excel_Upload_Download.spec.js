const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();//Create Workbook object
    await workbook.xlsx.readFile(filePath); // Read input file
    const worksheet = workbook.getWorksheet('Sheet1');//Read Sheet 
    const output = readExcel(worksheet, searchText); // not async - Read Sheet for given text

    const cell = worksheet.getCell(output.row, output.column + change.colChange); // Get the cell with row and col value and column shift col+colchange
    cell.value = replaceText; //replace text in the cell
    await workbook.xlsx.writeFile(filePath);//Write the Excel again with update value 
}

// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    return output;
}

//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");//this is to call directly the function

test('Upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const download = page.waitForEvent('download'); // wait till download complete 
    await page.getByRole('button', { name: 'Download' }).click();
    const dl = await download;
    const filePath = 'D:/QA Softwares/Excel_Download.xlsx'; // or await dl.path()

    // ✅ Ensure the edit finishes before upload
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
   
    // SetInputFiles used to send the file path as playwright doesn't support window action of browsing the file 
    await page.locator('#fileinput').setInputFiles(filePath); 

    //get by Row and filter with search text and then get locator with desired row containing text 
    //special way to find locator 
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });// locator additional filter by Search text 
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});