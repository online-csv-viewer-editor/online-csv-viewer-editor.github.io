
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

  // 2-1. multiple criteria
  // => check

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
        <MatchGrid state={stateVariables} />
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

  // "시작했으면 끝을 내는 습관" => 1년 허탕도 가능
  // "2차는 다른것" => 마케팅 집중

  // 1차 목표: google ad로 사용하는지 확인 (구매대행, ..., 외국인 사용 용도 등 custom target에 제공)
  // 2차 목표: export는 premium
