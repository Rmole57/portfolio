'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

const NAV_ITEMS = ['About', 'Projects', 'Contact'];

export default function HeaderNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', px: '100px' }}
      >
        <Typography variant="button" display="flex" alignItems="center">
          Rick Molé
        </Typography>
        <Tabs value={value} onChange={handleChange}>
          {NAV_ITEMS.map((item, idx) => (
            <Tab label={item} key={`${item}-${idx}`} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
