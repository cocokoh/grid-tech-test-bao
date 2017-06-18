//---------------------THE TABLE -----------------------------------------------------------------------------------

// specify the columns
var columnDefs = [
  {
    headerName: "Currency", field: "currency"
  }
];

var rowData = [
  {currency: "gdp", rate: 1.3},
  {currency: "SGD", rate: 2.3}
];

var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  onGridReady: function() {
    gridOptions.api.sizeColumnsToFit();
  },
  enableSorting: true,
  enableFilter: true
};
//---------------------THE TIME -----------------------------------------------------------------------------------

var date = new Date(), y = date.getFullYear(), m = 0; g=date.getMonth();
for (var i =1; i<13; i++){
var endDate = moment(new Date(y, m+i, 0)).format('MMM Do YY')
if (i === g+1){
columnDefs[i] = {headerName: endDate, field: "rate"}
} else if (i>g+1){
columnDefs[i] = {headerName: endDate, field: `future${i}_rate`}
} else {
columnDefs[i] = {headerName: endDate, field: `history${i}_rate`}
}}
for (var i = 1; i<g+1; i++){
var apiDate = moment(new Date(y, m+i, 0)).format('YYYY-MM-DD')
fetch(`https://openexchangerates.org/api/historical/${apiDate}.json?app_id=04d5f27b626548d69e87c07ef86057a8`)
.then((resp) => resp.json())
.then(function(history) {

})
.catch(function() {
  console.error('error')
})
}

//---------------------THE EXCHANGE RATE -----------------------------------------------------------------------------------
fetch('https://openexchangerates.org/api/latest.json?app_id=04d5f27b626548d69e87c07ef86057a8')
.then((resp) => resp.json())
.then(function(data) {
  for (var i =0; i<Object.keys(data.rates).length; i++){
    rowData.push({"currency": Object.keys(data.rates)[i], "rate": Object.values(data.rates)[i]})
  }
})
.catch(function(error) {
  console.log(error)
})

document.addEventListener("DOMContentLoaded", function() {
  var eGridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(eGridDiv, gridOptions);

});
