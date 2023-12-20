
// ExcelGrid.js
import { useCallback, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import parseExcelFile from './ExcelParser';
import FileInput from './FileInput';
import './ExcelGrid.css';

export const ExcelBase = ( { setMatchData, baseData, setBaseData } ) => {
  const handleFileChange = async (file) => {
    await parseExcelFile(file).then((parsedData) => {
      setBaseData(parsedData);
    });
  };

  return (
    <div>
      <FileInput onFileChange={handleFileChange} />
      <BaseGrid rowData={baseData} setMatchData={setMatchData} />
    </div>
  );
};

export const BaseGrid = ({ rowData, setMatchData }) => {

  const [selectedColId, setSelectedColId ] = useState("");

  const highlightSelectedColumn = (params) => {
    console.log(params)
    return params.colDef.colId === selectedColId ? 'highlighted-column' : '';
  };

  const getColumnDefs = () => {
      if (rowData.length === 0) {
          return [];
      }
      const keys = Object.keys(rowData[0]);
      return keys.map((key) => ({
          field: key,
          cellClass: {highlightSelectedColumn}
      }));
  };
  const columnDefs = getColumnDefs();
  const paginationPageSize = 20;

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

  const handleCellClicked = useCallback((params) => {
    console.log("handleCellClicked");
    const colId = params.column.colId;
    setSelectedColId(colId);
  }, []);

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          domLayout='autoHeight'
          onCellClicked={handleCellClicked}
  //        onColumnMoved={onColumnMoved}
 //         onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </>
  );
};

export const ExcelMatch = ( {matchData, setMatchData, setResultData} ) => {
//  const handleFileChange = async (file) => {
//    const parsedData = await parseExcelFile(file);
//    setExcelData(parsedData);
//  };
  const handleFileChange = async (file) => {
    await parseExcelFile(file).then((parsedData) => {
      setMatchData(parsedData);
    });
  };

  return (
    <div>
      <FileInput onFileChange={handleFileChange} />
      <MatchGrid rowData={matchData} setResultData={setResultData} />
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
          editable: true,
      }));
  };
  const columnDefs = getColumnDefs();
  const paginationPageSize = 20;

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          domLayout='autoHeight'
        />
      </div>
    </>
  );
};

export const ExcelResult = ( {resultData} ) => {
//  const handleFileChange = async (file) => {
//    const parsedData = await parseExcelFile(file);
//    setExcelData(parsedData);
//  };

  return (
    <div>
      <ResultGrid rowData={resultData} />
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