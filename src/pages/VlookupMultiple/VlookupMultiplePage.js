
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { BaseGrid, MatchGrid, ResultGrid } from './ExcelGrid';
import { VlookupButton } from './VlookupButton';
import { exampleBase, exampleMatch } from '../VlookupShared/ExampleData';
import VlookupMultipleTitle from './VlookupMultipleTitle';

const VlookupMultiplePage = () => {
  const [baseData, setBaseData] = useState(exampleBase);
  const [matchData, setMatchData] = useState(exampleMatch);
  const [resultData, setResultData] = useState([]);

  const [selectedColIdBase, setSelectedColIdBase ] = useState(new Set(["Order Product"]));
  const [selectedColIdMatch, setSelectedColIdMatch ] = useState(new Set(["Product ID"]));

  const [stringArrayBase, setStringArrayBase] = useState(["Order Product"]);
  const [stringArrayMatch, setStringArrayMatch] = useState(["Product ID"]);

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
    setSelectedColIdMatch,
    stringArrayBase,
    setStringArrayBase,
    stringArrayMatch,
    setStringArrayMatch
  };

  useEffect(() => {
      document.title = 'VLOOKUP multiple criteria';
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <VlookupMultipleTitle />
      </Grid>
      <Grid item xs={6}>
        <BaseGrid state={stateVariables} />
      </Grid>
      <Grid item xs={6}>
        <MatchGrid state={stateVariables} />
      </Grid>
      <Grid item xs={12}>
        <VlookupButton state={stateVariables} />
      </Grid>
      <Grid item xs={12}>
        <ResultGrid state={stateVariables} />
      </Grid>
    </Grid>
  );
};

export default VlookupMultiplePage;