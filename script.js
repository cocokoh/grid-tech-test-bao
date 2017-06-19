(function() {
  document.addEventListener("DOMContentLoaded", function() {
    $(document).ready(function() {
      $("#submit").on('click', multiply)
      function multiply(e) {
        var rowData = []
        var sin = $(e.target.parentNode).find("input").val()
        //---------------------THE TABLE -----------------------------------------------------------------------------------
        // specify the columns
        var columnDefs = [
          {
            headerName: "Currency",
            field: "currency"
          }
        ];

        //---------------------THE TIME -----------------------------------------------------------------------------------
        //HEADERS
        var date = new Date(),
          y = date.getFullYear(),
          m = 0;
        g = date.getMonth();
        for (var i = 1; i <= g + 1; i++) {
          var endDate = moment(new Date(y, m + i, 0)).format('MMM Do YY')
          if (i === g + 1) {
            columnDefs[i] = {
              headerName: endDate,
              field: "rate"
            }
          } else {
            columnDefs[i] = {
              headerName: endDate,
              field: `history${i}_rate`
            }
          }
        }

        var urls = []
        urls.push('https://openexchangerates.org/api/latest.json?app_id=04d5f27b626548d69e87c07ef86057a8')
        //LOOP FOR HISTORICAL FIGURES
        for (var i = 1; i < g + 1; i++) {
          var apiDate = moment(new Date(y, m + i, 0)).format('YYYY-MM-DD')
          urls.push(`https://openexchangerates.org/api/historical/${apiDate}.json?app_id=04d5f27b626548d69e87c07ef86057a8`)
        }

        var promises = urls.map(url => fetch(url).then(y => y.json()));
        Promise.all(promises).then(results => {
          localStorage.setItem('currencies', JSON.stringify(Object.keys(results[0].rates)))
          for (var i = 0; i < results.length; i++) {
            localStorage.setItem('rates' + i, JSON.stringify(Object.values(results[i].rates)))
          }
        });

        var currencies = JSON.parse(localStorage.getItem('currencies'))
        var rates0 = JSON.parse(localStorage.getItem('rates0'));
        var rates1 = JSON.parse(localStorage.getItem('rates1'));
        var rates2 = JSON.parse(localStorage.getItem('rates2'));
        var rates3 = JSON.parse(localStorage.getItem('rates3'));
        var rates4 = JSON.parse(localStorage.getItem('rates4'));
        var rates5 = JSON.parse(localStorage.getItem('rates5'));

        for (var i = 0; i < currencies.length; i++) {
          rowData.push({
            currency: currencies[i],
            rate: rates0[i] * sin,
            history1_rate: rates1[i] * sin,
            history2_rate: rates2[i] * sin,
            history3_rate: rates3[i] * sin,
            history4_rate: rates4[i] * sin,
            history5_rate: rates5[i] * sin
          })
        }

        var gridOptions = {
          columnDefs: columnDefs,
          rowData: rowData,
          onGridReady: function() {
            gridOptions.api.sizeColumnsToFit();
          },
          enableSorting: true,
          enableFilter: true
        };
        var eGridDiv = document.querySelector('#myGrid');
        new agGrid.Grid(eGridDiv, gridOptions);
      }
    })
  })
})()
