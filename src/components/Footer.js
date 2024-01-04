
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mike-tyson.tistory.com/">
        Mike Tyson
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Privacy() {
  return (
    <Typography m="3px" variant="body1">
      <Link color="inherit" href="https://mike-tyson.tistory.com/">
      Privacy
      </Link>
    </Typography>
  );
};

function Terms() {
  return (
    <Typography m="3px" variant="body1">
      <Link color="inherit" href="https://mike-tyson.tistory.com/">
      Terms
      </Link>
    </Typography>
  );
};

export default function Footer() {
  return (
        <Box
          component="footer"
          sx={{
            py: 1,
            px: 1,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <Box maxWidth="sm">
            <Box display={"flex"}>
              <Terms />
              <Privacy />
            </Box>
            <Copyright />
          </Box>
        </Box>
  );
}