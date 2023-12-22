
import './App.css';

// App.js
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { BaseGrid, MatchGrid, ResultGrid } from './ExcelGrid';
import { VlookupButton } from './VlookupButton';

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

  // 1-5. import
  // => check

  // 1-6-1. select key column in base and highlight
  // => check

  // 1-6-2. select key column in match and highlight
  // => check

  // 1-7. look for match on the selected column
  // => check

  // 1-8. load examples at init
  // => check

  // 1-9. first column selected on load
  // => /

const SplitScreen = () => {
  const [baseData, setBaseData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [resultData, setResultData] = useState([]);

  const [selectedColIdBase, setSelectedColIdBase ] = useState("");
  const [selectedColIdMatch, setSelectedColIdMatch ] = useState("");

  const stateVariables = {
    baseData,
    setBaseData,
    matchData,
    setMatchData,
    resultData,
    setResultData,
    selectedColIdBase,
    setSelectedColIdBase,
    selectedColIdMatch,
    setSelectedColIdMatch
  };

//  const exampleData = {
//    const exampleBase = [
//
//    ];
//
//    const exampleMatch = [
//
//    ];
//
//  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BaseGrid state={stateVariables} />
      </Grid>
      <Grid item xs={6}>
        <MatchGrid matchData={matchData} setMatchData={setMatchData} selectedColIdMatch={selectedColIdMatch} setSelectedColIdMatch={setSelectedColIdMatch} />
      </Grid>
      <Grid item xs={6}>
        <VlookupButton baseData={baseData} matchData={matchData} setResultData={setResultData} selectedColIdBase={selectedColIdBase} selectedColIdMatch={selectedColIdMatch} />
      </Grid>
      <Grid item xs={6}>
        <ResultGrid resultData={resultData} />
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
