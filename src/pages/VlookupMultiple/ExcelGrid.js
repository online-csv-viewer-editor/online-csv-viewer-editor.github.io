
// ExcelGrid.js
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { FileInput } from './ExcelParser';
import './ExcelGrid.css';

export const BaseGrid = ({ state }) => {
  const { stringArrayBase, setStringArrayBase, baseData, setBaseData, selectedColIdBase, setSelectedColIdBase } = state;

  const colorList = [
    'highlighted-column-one',
    'highlighted-column-two',
    'highlighted-column-three',
    'highlighted-column-four',
    'highlighted-column-five',
  ]

  const highlightSelectedColumn = (params) => {
    if (selectedColIdBase.has(params.colDef.field)) {
      const index = stringArrayBase.indexOf(params.colDef.field);
      return colorList[index];
    } else return '';
  };

  const getColumnDefs = () => {
      if (baseData.length === 0) {
          return [];
      }
      const keys = Object.keys(baseData[0]);
      return keys.map((key) => ({
          field: key,
          cellClass: highlightSelectedColumn
      }));
  };
  const columnDefs = getColumnDefs();
  const paginationPageSize = 10;

  const addString = (newString) => {
    const newSet = new Set(selectedColIdBase);
    newSet.add(newString);

    setSelectedColIdBase(newSet);

    setStringArrayBase([...stringArrayBase, newString]);
  };

  const removeString = (toBeRemoved) => {
    const newSet = new Set(selectedColIdBase);
    newSet.delete(toBeRemoved);

    setSelectedColIdBase(newSet);

    setStringArrayBase(stringArrayBase.filter((str) => str !== toBeRemoved));
  };

  const handleCellClicked = useCallback((params) => {
    const colId = params.column.colId;
    if (selectedColIdBase.has(colId)) {
      removeString(colId);
    } else {
      addString(colId);
    }
  }, [selectedColIdBase, setSelectedColIdBase]);

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  const resetBaseSelected = () => {
    setSelectedColIdBase(new Set());
    setStringArrayBase([]);
  };

  return (
    <div>
      <div>
        <FileInput reset={resetBaseSelected} setData={setBaseData} upload="UPLOAD base" />
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

  const { stringArrayBase, stringArrayMatch, setStringArrayMatch, baseData, selectedColIdBase, matchData, setMatchData, selectedColIdMatch, setSelectedColIdMatch } = state;

  const colorList = [
    'highlighted-column-one',
    'highlighted-column-two',
    'highlighted-column-three',
    'highlighted-column-four',
    'highlighted-column-five',
  ]

  const highlightSelectedColumn = (params) => {
    if (selectedColIdMatch.has(params.colDef.field)) {
      const index = stringArrayMatch.indexOf(params.colDef.field);
      return colorList[index];
    } else return '';
  };

  const addString = (newString) => {
    const newSet = new Set(selectedColIdMatch);
    newSet.add(newString);

    setSelectedColIdMatch(newSet);

    setStringArrayMatch([...stringArrayMatch, newString]);
  };

  const removeString = (toBeRemoved) => {
    const newSet = new Set(selectedColIdMatch);
    newSet.delete(toBeRemoved);

    setSelectedColIdMatch(newSet);

    setStringArrayMatch(stringArrayMatch.filter((str) => str !== toBeRemoved));
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
    const colId = params.column.colId;
    if (selectedColIdMatch.has(colId)) {
      removeString(colId);
    } else {
      addString(colId);
    }
  }, [selectedColIdMatch, setSelectedColIdMatch]);

  const paginationPageSize = 10;
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 25, 50, 100];
  }, []);

  function createNewJSON(originalJSON, keys) {
    const newJSON = {};

    keys.forEach(key => {
      if (originalJSON.hasOwnProperty(key)) {
        newJSON[key] = originalJSON[key];
      }
    });

    return newJSON;
  }

  const handleCreateNewClick = () => {
    const uniqueNewSet = new Set();
    const uniqueValuesJsonList = baseData.reduce((accumulator, json) => {
      const newJSON = createNewJSON(json, stringArrayBase);
      const newJSONString = JSON.stringify(newJSON);

      if (!uniqueNewSet.has(newJSONString)) {
        uniqueNewSet.add(newJSONString);
        accumulator.push(newJSON);
      }

      return accumulator;

    }, []);

    setMatchData(uniqueValuesJsonList);
  }

  const handleAddColumnClick = () => {
    const newColumnDefs = [
      ...columnDefs,
      { headerName: 'New Column', field: 'newColumn' }
    ];
    setColumnDefs(newColumnDefs);
  }

  const resetMatchSelected = () => {
    setSelectedColIdMatch(new Set());
    setStringArrayMatch([]);
  };

  return (
    <div>
      <div>
        <FileInput reset={resetMatchSelected} data={matchData} setData={setMatchData} upload="Upload Match" createNew="Create New" handleCreateNewClick={handleCreateNewClick} download="Download" />
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