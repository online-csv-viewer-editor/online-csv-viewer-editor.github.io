
import './App.css';

// App.js
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import FileInput from './FileInput';
import { BaseGrid, MatchGrid, ResultGrid } from './ExcelGrid';
import parseExcelFile from './ExcelParser';

// Match Data
// 1. load from selected column. count generate unique

  // 1-1. first base column
  // extract to match
  // find unique

// => check

  // 1-2. data to match first column

  // => check

const ExcelBase = ( { setMatchData } ) => {
  const [baseData, setBaseData] = useState([]);

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

const ExcelMatch = ( {matchData, setMatchData} ) => {
//  const handleFileChange = async (file) => {
//    const parsedData = await parseExcelFile(file);
//    setExcelData(parsedData);
//  };

  return (
    <div>
      <MatchGrid rowData={matchData} />
    </div>
  );
};

const ExcelResult = ( {resultData, setResultData} ) => {
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

const SplitScreen = () => {
  const [matchData, setMatchData] = useState([]);
  const [resultData, setResultData] = useState([]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container direction="column">
          <ExcelBase setMatchData={setMatchData} />
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <ExcelMatch matchData={matchData} />
        </Grid>
        <Grid container direction="column">
          <ExcelResult resultData={resultData} />
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
