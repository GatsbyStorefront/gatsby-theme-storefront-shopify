/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Box } from 'theme-ui';

const Divider = (props) => (
  <Box
    {...props}
    as="hr"
    sx={{
      borderTop: '1px solid',
      height: '1px',
      borderLeft: 'none',
      borderTopColor: 'divider',
    }}
  />
);

export default Divider;
