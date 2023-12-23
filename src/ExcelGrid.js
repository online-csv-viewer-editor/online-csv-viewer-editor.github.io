
// ExcelGrid.js
import React, { useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { FileInput } from './ExcelParser';
import './ExcelGrid.css';

export const BaseGrid = ({ state }) => {
  const { baseData, setBaseData, setMatchData, selectedColIdBase, setSelectedColIdBase } = state;

  const highlightSelectedColumn = (params) => {
    return params.colDef.field === selectedColIdBase ? 'highlighted-column-base' : '';
  };

  const getColumnDefs = () => {
      if (baseData.length === 0) {
          return [];
      }
      const keys = Object.keys(baseData[0]);
      return keys.map((key) => ({
          field: key,
          editable: true,
          cellClass: highlightSelectedColumn
      }));
  };
  const columnDefs = getColumnDefs();
  const paginationPageSize = 10;

  const handleCellClicked = useCallback((params) => {
    const colId = params.column.colId;
    if (selectedColIdBase !== colId) {
      setSelectedColIdBase(colId);
    }
  }, [selectedColIdBase, setSelectedColIdBase]);

  // extract values and setMatchData
//  const onColumnMoved = useCallback((params) => {
//    console.log("onColumnMoved. params: ", params)
//    if (params.finished === true) {
//      if (params.toIndex === 0) {
//        const firstColumn = params.api.getAllGridColumns()[0];
//        if (firstColumn) {
//          const columnKey = firstColumn.getColId();
//          const uniqueValuesSet = new Set();
//          params.api.forEachNode((rowNode) => {
//            uniqueValuesSet.add(rowNode.data[columnKey]);
//          });
//          const uniqueValuesArray = Array.from(uniqueValuesSet);
//          const uniqueValuesJsonList = uniqueValuesArray.map((value) => ({
//            [columnKey]: value,
//          }));
//          setMatchData(uniqueValuesJsonList);
//        }
//      }
//      const newColumnDefs = params.api.getColumnState();
//      console.log(params.api.getColumnState());
//      params.api.setGridOption('columnDefs', newColumnDefs);
//    }
//  }, [setMatchData]);

//  const onfirstdatarendered = usecallback((params) => {
//    const firstcolumn = params.api.getallgridcolumns()[0];
//    if (firstcolumn) {
//      const columnkey = firstcolumn.getcolid();
//      const uniquevaluesset = new set();
//      params.api.foreachnode((rownode) => {
//        uniquevaluesset.add(rownode.data[columnkey]);
//      });
//      const uniquevaluesarray = array.from(uniquevaluesset);
//      const uniquevaluesjsonlist = uniquevaluesarray.map((value) => ({
//        [columnkey]: value,
//        "editablecolumn": "matching property for " + value
//      }));
//      setmatchdata(uniquevaluesjsonlist);
//      console.log(uniquevaluesjsonlist);
//    }
//  }, [setmatchdata]);

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  return (
    <>
      <div>
        <FileInput setData={setBaseData} />
      </div>
      <div className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={baseData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellClicked={handleCellClicked}
  //        onColumnMoved={onColumnMoved}
 //         onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </>
  );
};

export const MatchGrid = ({ matchData, setMatchData, selectedColIdMatch, setSelectedColIdMatch }) => {

  const highlightSelectedColumn = (params) => {
    return params.colDef.field === selectedColIdMatch ? 'highlighted-column-match' : 'highlighted-column-match-not';
  };

  const getColumnDefs = () => {
      if (matchData.length === 0) {
          return [];
      }
      const keys = Object.keys(matchData[0]);
      return keys.map((key) => ({
          field: key,
          editable: true,
          cellClass: highlightSelectedColumn
      }));
  };

  const columnDefs = getColumnDefs();

  const handleCellClicked = useCallback((params) => {
    const colId = params.column.colId;
    if (selectedColIdMatch !== colId) {
      setSelectedColIdMatch(colId);
    }
  }, [selectedColIdMatch, setSelectedColIdMatch]);

  const paginationPageSize = 10;
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  return (
    <>
      <div>
        <FileInput setData={setMatchData} />
      </div>
      <div className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={matchData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellClicked={handleCellClicked}
        />
      </div>
    </>
  );
};

export const ResultGrid = ({ state }) => {

  const { resultData, selectedColIdBase } = state;

  const highlightSelectedColumn = (params) => {
    return params.colDef.field === selectedColIdBase ? 'highlighted-column-base' : 'highlighted-column-match-not';
  };

  const getColumnDefs = () => {
      if (resultData.length === 0) {
          return [];
      }
      const keys = Object.keys(resultData[0]);
      return keys.map((key) => ({
          field: key,
          editable: true,
          cellClass: highlightSelectedColumn
      }));
  };
  const columnDefs = getColumnDefs();
  const paginationPageSize = 20;

  return (
    <div className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={resultData}
        pagination={true}
        paginationPageSize={paginationPageSize}
      />
    </div>
  );
};