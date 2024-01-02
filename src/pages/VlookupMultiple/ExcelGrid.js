
// ExcelGrid.js
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { FileInput } from './ExcelParser';
import './ExcelGrid.css';

export const BaseGrid = ({ state }) => {
  const { baseData, setBaseData, selectedColIdBase, setSelectedColIdBase } = state;

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

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  return (
    <div>
      <div>
        <FileInput setData={setBaseData} upload="UPLOAD base" />
      </div>
      <div className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={baseData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellClicked={handleCellClicked}
        />
      </div>
    </div>
  );
};

export const MatchGrid = ({ state }) => {

 const { baseData, selectedColIdBase, matchData, setMatchData, selectedColIdMatch, setSelectedColIdMatch } = state;

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

  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    setColumnDefs(getColumnDefs())
  }, [matchData, selectedColIdMatch]);

  const handleCellClicked = useCallback((params) => {
    console.log("handleCellClicked");
    const colId = params.column.colId;
    if (selectedColIdMatch !== colId) {
      setSelectedColIdMatch(colId);
    }
  }, [selectedColIdMatch, setSelectedColIdMatch]);

  const paginationPageSize = 10;
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  const handleCreateNewClick = () => {
    const uniqueValuesSet = new Set();
    for (const item of baseData) {
      if (item.hasOwnProperty(selectedColIdBase)) {
        uniqueValuesSet.add(item[selectedColIdBase])
      }
    }
    const uniqueValuesArray = Array.from(uniqueValuesSet);
    const uniqueValuesJsonList = uniqueValuesArray.map((value) => ({
      [selectedColIdBase]: value,
    }));
    setMatchData(uniqueValuesJsonList);
  }

  const handleAddColumnClick = () => {
    const newColumnDefs = [
      ...columnDefs,
      { headerName: 'New Column', field: 'newColumn' }
    ];
    setColumnDefs(newColumnDefs);
  }

  return (
    <div>
      <div>
        <FileInput data={matchData} setData={setMatchData} upload="Upload Match" createNew="Create New" handleCreateNewClick={handleCreateNewClick} download="Download" />
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
    </div>
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

  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    setColumnDefs(getColumnDefs())
  }, [resultData]);

  const paginationPageSize = 10;
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  const handleAddColumnClick = () => {
    const newColumnDefs = [
      ...columnDefs,
      { headerName: 'New Column', field: 'newColumn' }
    ];
    setColumnDefs(newColumnDefs);
  }

  return (
    <Box>
      <Box>
        <FileInput data={resultData} download="Download" />
      </Box>
      <Box className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={resultData}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </Box>
    </Box>
  );
};