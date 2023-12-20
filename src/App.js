
import './App.css';

// App.js
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import FileInput from './FileInput';
import { BaseGrid, MatchGrid, ResultGrid } from './ExcelGrid';
import { VlookupButton } from './VlookupButton';
import parseExcelFile from './ExcelParser';

// Match Data
// 1. load from selected column. count generate unique

  // 1-1. first base column
  // extract to match
  // find unique

// => check

  // 1-2. data to match first column

  // => check

  // 1-3. edit match 2nd column

  // => check

  // 1-4. copy data to result first column

  // => check

const ExcelBase = ( { setMatchData, baseData, setBaseData } ) => {
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

const ExcelMatch = ( {matchData, setMatchData, setResultData} ) => {
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

const ExcelResult = ( {resultData} ) => {
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
  const [baseData, setBaseData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [resultData, setResultData] = useState([]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container direction="column">
          <Grid item xs>
            { resultData.length === 0 ? (
              <ExcelBase baseData={baseData} setBaseData={setBaseData} setMatchData={setMatchData} />
            ) : (
              <ExcelResult resultData={resultData} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <ExcelMatch matchData={matchData} />
          <VlookupButton baseData={baseData} matchData={matchData} setResultData={setResultData} />
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
