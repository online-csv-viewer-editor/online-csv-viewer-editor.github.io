
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import VlookupOneTitle from '../../images/vlookup_one_title.png';

export const VlookupButton = ({ state }) => {

  const { setResultData, matchData, baseData, selectedColIdBase, selectedColIdMatch, stringArrayBase, stringArrayMatch } = state;

  const [error, setError] = useState("");

  const handleClick = () => {

    const keysArray = Object.keys(baseData);

    function checkItemsMatch(base, match) {
      for (let i = 0; i < stringArrayBase.length; i++) {
        const baseKey = stringArrayBase[i];
        const matchKey = stringArrayMatch[i];
        if (base[baseKey] !== match[matchKey]) return false;
      }
      return true;
    }

    const modifyBaseUsingMatch = (base) => {

      const keysToKeepFromBase = selectedColIdBase;
      const modifiedBase = Object.fromEntries(
        Object.entries(base).filter(([key]) => keysToKeepFromBase.has(key))
      );

      const matchingItem = matchData.find(match => checkItemsMatch(base, match));

      if (matchingItem) {
        const keysToRemoveFromMatch = selectedColIdMatch;
        const modifiedMatch = Object.fromEntries(
          Object.entries(matchingItem).filter(([key]) => !keysToRemoveFromMatch.has(key))
        );
        return { ...modifiedBase, ...modifiedMatch};
      } else {
        return { ...modifiedBase };
      }

    };

    const mergeData = () => {
      return baseData.map(base => modifyBaseUsingMatch(base));
    };

    const checkError = () => {
      if (stringArrayBase.length === 0) {
        setError("Please, select a column in base by clicking on a cell");
        return false;
      }
      if (stringArrayMatch.length === 0) {
        setError("Please, select a column in match by clicking on a cell");
        return false;
      }
      if (stringArrayBase.length !== stringArrayMatch.length) {
        setError("Numbers of selected columns do not match");
        return false;
      }
      setError("")
      return true;
    };

    if (!checkError()) return;

    if (keysArray.length > 0) {
      const mergedData = mergeData();
      setResultData(mergedData);
    } else {
      console.log("baseData unavailable");
    }
  };

  return (
    <div>
      <Box textAlign="center">
        <img src={VlookupOneTitle} alt="vlookup explanation" />
      </Box>
      <Box
        textAlign="center"
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
          maxWidth: '50%'
        }}
        margin="auto"
        onClick={handleClick}
      >
        <Typography variant="h3" component="h3" textAlign="center">
          SHOW RESULT
        </Typography>
        <Typography variant="h6" component="h6" textAlign="center">
          By using our service you accept our <Link>Terms of service</Link> and <Link>Privacy Policy</Link>
        </Typography>
      </Box>
      {
        error ?
          <Box
            sx={{
              maxWidth: '400px'
            }}
            margin="auto"
            mt="5px"
          >
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </Box>
        : <></>
      }
    </div>
  );
};