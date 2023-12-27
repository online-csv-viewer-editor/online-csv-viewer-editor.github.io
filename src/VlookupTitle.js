
import React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardMedia } from '@mui/material';

import VlookupOneTitle from './images/vlookup_one_title.png';

function VlookupTitle() {
  return (
    <div>
      <Typography variant="h2" component="h1" textAlign="center">
        VLOOKUP (single criterion)
      </Typography>
      <Card
        style={{ display:'flex', justifyContent: 'center' }}
      >
        <CardMedia
          component="img"
          image={VlookupOneTitle}
          alt="vlookup explanation"
          style={{ maxHeight: '200px', maxWidth:'730px' }}
        />
      </Card>
    </div>
  );
}

export default VlookupTitle;