import React from 'react';
import { Box } from 'rebass';

const Divider = props => (
  <Box
    {...props}
    as="hr"
    sx={{
      border: 0,
      height: 1,
    }}
  />
);

export default Divider;
