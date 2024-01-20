
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import VlookupMultipleExplain from '../../images/vlookup_multiple_explain.png';
import VideoDialog from '../VlookupShared/VideoDialog';

import { VlookupButtonTitle } from './Translations';

export const VlookupButton = ({ state }) => {

  const { setResultData, matchData, baseData, selectedColIdBase, selectedColIdMatch, stringArrayBase, stringArrayMatch } = state;

  const [error, setError] = useState("");

  const handleClick = () => {
    
    const keysArray = Object.keys(baseData);

    function checkItemsMatch(base, match) {
      for (let i = 0; i < stringArrayBase.length; i++) {
        const baseKey = stringArrayBase[i];
        const matchKey = stringArrayMatch[i];
        if (base[baseKey] !== match[matchKey]) { 
          return false;
        }
      }
      return true;
    }

    const modifyBaseUsingMatch = (base) => {

      const addedKeysToKeep = new Set(["구매자", "수취인이름", "우편번호", "수취인 주소", "배송메세지","개인통관번호(PCCC)","통관용수취인전화번호", ""]);

//      const keysToKeepFromBase = new Set([ ...selectedColIdBase, ...addedKeysToKeep]);
      const keysToKeepFromBase = new Set([ ...addedKeysToKeep]);

      const modifiedBase = Object.fromEntries(
        Object.entries(base).filter(([key]) => keysToKeepFromBase.has(key))
      );

      const matchingItem = matchData.find(match => checkItemsMatch(base, match));

      if (matchingItem) {

//        const keysToRemoveFromMatch = selectedColIdMatch;
//        const modifiedMatch = Object.fromEntries(
//          Object.entries(matchingItem).filter(([key]) => !keysToRemoveFromMatch.has(key))
//        );

        const modifiedMatch = matchingItem;

//        return { ...modifiedBase, ...modifiedMatch};
        return { ...modifiedMatch, ...modifiedBase };
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

  const [openHelp, setOpenHelp] = useState(false);

  const handleDialogOpen = () => {
    setOpenHelp(true);
  };

  const handleDialogClose = () => {
    setOpenHelp(false);
  };

  const DefaultValueSelect = () => {

    const DeliveryFormControl = () => {

      const handleSelectChange = (event) => {

      };

      return (
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native-배송방법">
            배송방법
          </InputLabel>
          <NativeSelect
            defaultValue={'ship'}
            onChange={}
            inputProps={{
              name: '배송방법',
              id: 'uncontrolled-native-배송방법',
            }}
          >
            <option value={'airplane'}>항공특송</option>
            <option value={'ship'}>해운특송</option>
          </NativeSelect>
        </FormControl>
      );
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <DeliveryFormControl />
      </Box>
    );
  }

  return (
    <div>
      <Box textAlign="center" onClick={handleDialogOpen}
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          maxWidth: '50%'
        }}
        margin="auto"
      >
        <img src={VlookupMultipleExplain} alt="explain how to use the website" />
        <VideoDialog open={openHelp} handleClose={handleDialogClose} />
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
        }}
        margin="auto"
        onClick={handleClick}
        mt="15px"
      >
        <Typography variant="h3" component="h3" textAlign="center">
          {VlookupButtonTitle}
        </Typography>
        <Typography variant="h6" component="h6" textAlign="center">
          By using our service, you accept our <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
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
      <DefaultValueSelect />
    </div>
  );
};