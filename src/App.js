
import './App.css';

// App.js
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { BaseGrid, MatchGrid, ResultGrid } from './ExcelGrid';
import { VlookupButton } from './VlookupButton';
import { exampleBase, exampleMatch } from './ExampleData';
import ResponsiveAppBar from './ResponsiveAppBar'; 
import Footer from './Footer';
import VlookupTitle from './VlookupTitle';

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

  // 1-8. modal for selecting a sheet
  // => check

  // 1-9. load examples at init
  // => check

  // 1-10. first column selected on load
  // => check

  // 1-11. column + column = result
  // => check

  // 1-11-1. show result on load
  // => check

  // 1-11-2. color remaining columns
  // => check

  // 1-12-1. let running task 1. appbar 
  // => check

  // 1-12-2. let running task 2. footer
  // => check
 
  // 1-12-3. let running task 3. figma
  // => check

  // 1-12-3-1. title h3
  // => check

  // 1-12-3-2. figma image, title, buttons
  // => check

  // 1-2-3-3. create new working
  // => check

  // "시작했으면 끝을 내는 습관" => 1년 허탕도 가능
  // "2차는 다른것"

  // 1차 목표: google ad로 사용하는지 확인
  // 2차 목표: export는 premium

const SplitScreen = () => {
  const [baseData, setBaseData] = useState(exampleBase);
  const [matchData, setMatchData] = useState(exampleMatch);
  const [resultData, setResultData] = useState([]);

  const [selectedColIdBase, setSelectedColIdBase ] = useState("Order Product");
  const [selectedColIdMatch, setSelectedColIdMatch ] = useState("Product ID");

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <VlookupTitle />
      </Grid>
      <Grid item xs={6}>
        <BaseGrid state={stateVariables} />
      </Grid>
      <Grid item xs={6}>
        <MatchGrid matchData={matchData} setMatchData={setMatchData} selectedColIdMatch={selectedColIdMatch} setSelectedColIdMatch={setSelectedColIdMatch} />
      </Grid>
      <Grid item xs={12}>
        <VlookupButton baseData={baseData} matchData={matchData} setResultData={setResultData} selectedColIdBase={selectedColIdBase} selectedColIdMatch={selectedColIdMatch} />
      </Grid>
      <Grid item xs={12}>
        <ResultGrid state={stateVariables} />
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <SplitScreen />
      <Footer />
    </>
  );
};

export default App;
