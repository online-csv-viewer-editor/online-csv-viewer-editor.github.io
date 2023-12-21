
import { Box, Button } from '@mui/material';

export const VlookupButton = ( { setResultData, matchData, baseData, selectedColIdBase, selectedColIdMatch } ) => {

  const handleClick = () => {
    const keysArray = Object.keys(baseData);

    const mergeData = () => {
      return baseData.map(base => {
        const matchingItem = matchData.find(match => base[selectedColIdBase] === match[selectedColIdMatch]);
        return matchingItem ? { ...base, ...matchingItem } : base;
      });
    };

    if (keysArray.length > 0) {
      console.log("baseData: ", baseData);
      console.log("matchData: ", matchData);
      console.log("selectedColIdBase: ", selectedColIdBase);
      console.log("selectedColIdMatch: ", selectedColIdMatch);
      // merge json
      const mergedData = mergeData();
      console.log("mergedData: ", mergedData);
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