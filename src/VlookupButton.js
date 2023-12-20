
import { Box, Button } from '@mui/material';

export const VlookupButton = ( { setResultData, matchData, baseData } ) => {

  const handleClick = () => {
    const keysArray = Object.keys(baseData);

    if (keysArray.length > 0) {
      // merge json
      const mergedData = baseData.map(base => ({
//        ...base,
        ...matchData.find(match => match.id === base.id),
      }));
      console.log(mergedData);
      setResultData(mergedData);
    } else {
      console.log("baseData unavailable");
    }
  };


  return (
    <Box textAlign="center">
      <Button onClick={handleClick}>VLOOKUP</Button>
    </Box>
  );
};