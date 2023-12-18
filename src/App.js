
import './App.css';

// App.js
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import FileInput from './FileInput';
import ExcelGrid from './ExcelGrid';
import parseExcelFile from './ExcelParser';

// Match Data
// 1. load from selected column. count generate unique
// => check

const ExcelBase = () => {
  const [baseData, setBaseData] = useState([]);

  const handleFileChange = async (file) => {
    const parsedData = await parseExcelFile(file);
    setBaseData(parsedData);
  };

  return (
    <div>
      <FileInput onFileChange={handleFileChange} />
      <ExcelGrid rowData={baseData} />
    </div>
  );
};

const ExcelMatch = () => {
  const handleFileChange = async (file) => {
    const parsedData = await parseExcelFile(file);
    setExcelData(parsedData);
  };

  return (
    <div>
      <FileInput onFileChange={handleFileChange} />
      <ExcelGrid rowData={excelData} />
    </div>
  );
};

const SplitScreen = () => {
  const [matchData, setMatchData] = useState([]);
  const [resultData, setResultData] = useState([]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container direction="column">
          <ExcelBase />
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <ExcelMatch />
        </Grid>
        <Grid container direction="column">
          <ExcelResult />
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
