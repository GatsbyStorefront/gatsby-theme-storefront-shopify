/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Flex, Box } from 'theme-ui';

const Badge = (props) => {
  const {
    text,
    format = 'circle',
    size = [48, 58],
    width = size,
    height = size,
    textColor = 'white',
    bgColor = 'badge',
    mx,
    my,
  } = props;

  let borderRadius;
  if (format === 'circle') {
    borderRadius = 9999;
  } else if (format === 'box') {
    borderRadius = 15;
  }

  return (
    <Flex
      sx={{
        color: textColor,
        bg: bgColor,
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
        mx,
        my,
        fontSize: 1,
        width,
        height,
        borderRadius,
      }}
    >
      <Box
        sx={{
          fontFamily: 'body',
        }}
      >
        {text}
      </Box>
    </Flex>
  );
};

export default React.memo(Badge);
