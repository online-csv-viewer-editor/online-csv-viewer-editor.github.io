
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { BaseGrid, MatchGrid, ResultGrid } from '../VlookupShared/ExcelGrid';
import { VlookupButton } from '../VlookupShared/VlookupButton';
import { exampleBase, exampleMatch } from '../VlookupShared/ExampleData';
import VlookupJapantimemallTitle from './VlookupJapantimemallTitle';

const VlookupJapantimemallPage = () => {
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
        <VlookupJapantimemallTitle />
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

export default VlookupJapantimemallPage;