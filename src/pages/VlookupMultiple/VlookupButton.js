
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Link from '@mui/material/Link';

import VlookupOneTitle from '../../images/vlookup_one_title.png';

export const VlookupButton = ( state ) => {

  const { setResultData, matchData, baseData, selectedColIdBase, selectedColIdMatch, stringArrayBase, stringArrayMatch } = state;

  const handleClick = () => {

    if (stringArrayBase.length !== stringArrayMatch.length) {
      alert("NUMBER OF CRITERIA DOES NOT MATCH");
      return;
    }

    const keysArray = Object.keys(baseData);

    function itemsMatch(item1, item2) {
      for (let i = 0; i < stringArrayBase.length; i++) {
        const item1key = stringArrayBase[i];
        const item2key = stringArrayBase[i];
        if (item1[item1key] !== item2[item2key]) return false;
      }
      return true;
    }

    const mergeData = () => {
      return baseData.map(base => {
        const matchingItem = matchData.find(match => itemsMatch(base, match));
        if (matchingItem) {
          const { [selectedColIdMatch]: _, ...restOfMatch } = matchingItem;
          return { [selectedColIdBase]: base[selectedColIdBase], ...restOfMatch };
        } else {
          return { [selectedColIdBase]: base[selectedColIdBase] };
        }
      });
    };

    if (keysArray.length > 0) {
      // merge json
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
    </div>
  );
};