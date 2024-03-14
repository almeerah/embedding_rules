console.log("Hello world");

// create constants and variables that we will use later to find out about the workbook structure
const viz = document.getElementById("ourViz");
let workbook;
let vizActiveSheet;
let listSheets;

//sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// log all info about the workbook with a function

function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  //Get the array of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
        is: "${element.name}"`);
  });

  //We are only interested in the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet name is: 
        "${vizActiveSheet.name}"`);

  // List all worksheets in active sheet

  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
        is: "${element.name}"`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// log the workbook info once the viz is interactive

viz.addEventListener("firstinteractive", logWorkbookInformation);

// Tell JS which button to look for

const oreganWashingtonButton = document.getElementById("oregan_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// Functions to do when buttons are clicked

function oreganWashingtonFunction() {
  // Log what is pressed
  console.log(oreganWashingtonButton.value);

  // Apply filter to all sheets
  saleMap.applyFilterAsync("State", ["Oregan", "Washington"], "replace");
  totalSales.applyFilterAsync("State", ["Oregan", "Washington"], "replace");
  salesBySegment.applyFilterAsync("State", ["Oregan", "Washington"], "replace");
  salesByProduct.applyFilterAsync("State", ["Oregan", "Washington"], "replace");
}

oreganWashingtonButton.addEventListener("click", oreganWashingtonFunction);

function clearFilterFunction() {
  // Remove filter on all sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
}

clearFilterButton.addEventListener("click", clearFilterFunction);

function undoFunction() {
  viz.undoAsync();
}

undoButton.addEventListener("click", undoFunction);
