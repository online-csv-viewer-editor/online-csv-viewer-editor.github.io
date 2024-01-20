
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';


import { BaseGrid, MatchGrid, ResultGrid, FinalGrid } from './ExcelGrid';
import { VlookupButton } from './VlookupButton';
import { ExampleJapantimemallBase, ExampleJapantimemallMatch } from './ExampleData';
import VlookupJapantimemallTitle from './VlookupJapantimemallTitle';

const VlookupMultiplePage = () => {
  const [baseData, setBaseData] = useState(ExampleJapantimemallBase);
  const [matchData, setMatchData] = useState(ExampleJapantimemallMatch);
  const [resultData, setResultData] = useState([]);

  const initList = [
    "옵션ID",
    "등록상품명",
    "등록옵션명",
  ];

  const [selectedColIdBase, setSelectedColIdBase ] = useState(new Set(initList));
  const [selectedColIdMatch, setSelectedColIdMatch ] = useState(new Set(initList));
  const [stringArrayBase, setStringArrayBase] = useState(initList);
  const [stringArrayMatch, setStringArrayMatch] = useState(initList);

  const [defaultKeyValuePairs, setDefaultKeyValuePairs] = useState(new Map());

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
    setStringArrayMatch,
    defaultKeyValuePairs,
    setDefaultKeyValuePairs
  };

  const MyGrid = ({ children }) => {
    return (
      <Grid item xs={12} md={10}>
        {children}
      </Grid>
    );
  };

  return (
    <div>
      <Helmet>
        <title>재팬타임몰 배송 대행 신청서 자동 작성 - 쿠팡 전용</title>
        <meta name="description" content= "재팬타임몰 배송 대행 신청서 자동 작성 - 쿠팡 전용" />
      </Helmet>
      <Grid container justifyContent="center" spacing={2} mt={1}>
        <MyGrid>
          <VlookupJapantimemallTitle />
        </MyGrid>
        <MyGrid>
          <BaseGrid state={stateVariables} />
        </MyGrid>
        <MyGrid>
          <MatchGrid state={stateVariables} />
        </MyGrid>
        <MyGrid>
          <VlookupButton state={stateVariables} />
        </MyGrid>
        <MyGrid>
          <ResultGrid state={stateVariables} />
        </MyGrid>
        <MyGrid>
          <DefaultValueSelect />
        </MyGrid>
        <MyGrid>
          <FinalGrid state={stateVariables} />
        </MyGrid>
      </Grid>
    </div>
  );
};

export default VlookupMultiplePage;