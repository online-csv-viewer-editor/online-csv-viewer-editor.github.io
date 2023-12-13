import './App.css';

import React from 'react';
import { Grid } from '@mui/material';

const DataTable = () => {
    var dataTable;

    function handleFileUpload(event) {
      var fileInput = event.target;

      var selectedEncoding = document.getElementById('encodingSelect').value;

      if (fileInput.files.length > 0) {
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = function(e) {
          var csvContent = e.target.result;
          csvContent = csvContent.replace(/\s+$/, '');
          processCSV(csvContent);
        };
        reader.readAsText(file, selectedEncoding);
        document.getElementById('baseFileInput').remove();
        document.getElementById('baseFileLabel').remove();
        document.getElementById('encodingLabel').remove();
        document.getElementById('encodingSelect').remove();
      } else {
        alert("Please select a CSV file.");
      }
    }

    function processCSV(csvContent) {
      Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          var columns =  Object.keys(results.data[0]).map(function(key) {
            return { data: key, title: key };
          });
          columns.unshift({ data: '', title: 'index', mData: '', sTitle: 'index', defaultContent: ''})
          dataTable = $('#myTable').DataTable({
            data: results.data,
            responsive: true,
            columns: columns,
            scrollX: true,
            dom: 'Blfrtip',
            select: true,
            buttons: [
              'colvis',
              {
                extend: 'csv',
                text: 'CSV',
                exportOptions: {
                  columns: ':visible'
                }
              },
              {
                extend: 'excel',
                text: 'EXCEL',
                exportOptions: {
                  columns: ':visible'
                }
              },
              {
                extend: 'pdf',
                text: 'PDF',
                exportOptions: {
                  columns: ':visible'
                }
              },
              {
                text: 'JSON',
                action: function ( e, dt, button, config ) {
                    var data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob( [ JSON.stringify( data ) ] ),
                        'Export.json'
                    );
                }
              }
            ],
            colResize: {
              isEnabled: true,
              saveState: true
            },
          });
          dataTable.on('order.dt search.dt', function () {
            dataTable.column(0, {search:'applied', order:'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
          }).draw();
          dataTable.on('draw.dt', function () {
            dataTable.column(0, {search:'applied', order:'applied'}).nodes().each(function (cell, i) {
              cell.innerHTML = i + 1;
            });
          }).draw();
        }
      });
    }

  return (
    <>
      <div style={{textAlign: "center"}}>
        <div>
          <label id="encodingLabel" htmlFor="encodingSelect">Encoding</label>
          <select id="encodingSelect">
            <option value="UTF-8">UTF-8</option>
            <option value="UTF-16">UTF-16</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
            <option value="windows-1252">Windows-1252</option>
            <option value="EUC-KR">한글</option>
            <option value="shift-jis">日本語</option>
            <option value="gb2312">中文</option>
          </select>
        </div>
        <div>
          <label id="baseFileLabel" htmlFor="baseFileInput">Base Excel</label>
          <input type="file" id="baseFileInput" accept=".csv" onChange={handleFileUpload}></input>
        </div>
      </div>

      <table id="myTable" className="display">
        <thead>
        </thead>
        <tbody>
        </tbody>
      </table>
    </>
  );
};

const SplitScreen = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container direction="column">
          <Grid item xs>
            <DataTable />
          </Grid>
          <Grid item xs>
            <DataTable />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <Grid item xs>
            <DataTable />
          </Grid>
          <Grid item xs>
            <DataTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <SplitScreen />
  );
};

export default App;
