
import { Box, Button } from '@mui/material';

export const VlookupButton = ( { setResultData, matchData, baseData, selectedColIdBase, selectedColIdMatch } ) => {

  const handleClick = () => {
    const keysArray = Object.keys(baseData);

    const mergeData = () => {
      return baseData.map(base => {
        const matchingItem = matchData.find(match => base[selectedColIdBase] === match[selectedColIdMatch]);
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
    <Box textAlign="center">
      <Button onClick={handleClick}>VLOOKUP</Button>
    </Box>
  );
};