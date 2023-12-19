
// ExcelGrid.js
import { useCallback, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const BaseGrid = ({ rowData, setMatchData }) => {
  const getColumnDefs = () => {
      if (rowData.length === 0) {
          return [];
      }
      const keys = Object.keys(rowData[0]);
      return keys.map((key) => ({
          field: key,
      }));
  };
  const columnDefs = getColumnDefs();
  const paginationPageSize = 20;

  // extract values and setMatchData
  const onColumnMoved = useCallback((params) => {
    console.log("onColumnMoved. params: ", params)
    if (params.finished === true) {
      console.log("finished === true")
      if (params.toIndex === 0) {
        console.log("toIndex === 0"); 
      }

    }
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    const firstColumn = params.api.getAllGridColumns()[0];
    if (firstColumn) {
      const uniqueValuesSet = new Set();
      params.api.forEachNode((rowNode) => {
        uniqueValuesSet.add(rowNode.data[firstColumn.getColId()]);
      });
      const uniqueValuesArray = Array.from(uniqueValuesSet);
      const uniqueColumnData = {
        headerName: firstColumn.getColDef().field,
        values: uniqueValuesArray,
      };
      console.log(uniqueColumnData);
    }
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout='autoHeight'
        onColumnMoved={onColumnMoved}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
};

export const MatchGrid = ({ rowData }) => {
    const getColumnDefs = () => {
        if (rowData.length === 0) {
            return [];
        }
        const keys = Object.keys(rowData[0]);
        return keys.map((key) => ({
            field: key,
        }));
    };
    const columnDefs = getColumnDefs();
    const paginationPageSize = 20;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout='autoHeight'
      />
    </div>
  );
};

export const ResultGrid = ({ rowData }) => {
    const getColumnDefs = () => {
        if (rowData.length === 0) {
            return [];
        }
        const keys = Object.keys(rowData[0]);
        return keys.map((key) => ({
            field: key,
        }));
    };
    const columnDefs = getColumnDefs();
    const paginationPageSize = 20;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout='autoHeight'
      />
    </div>
  );
};