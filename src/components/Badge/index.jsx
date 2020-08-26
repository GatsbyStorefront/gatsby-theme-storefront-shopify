import React from 'react';
import { Flex, Box } from 'rebass';

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
      color={textColor}
      bg={bgColor}
      alignItems="center"
      justifyItems="center"
      justifyContent="center"
      mx={mx}
      my={my}
      sx={{
        display: 'inline-block',
        fontSize: 1,
        width,
        height,
        borderRadius,
      }}
    >
      <Box fontFamily="body">{text}</Box>
    </Flex>
  );
};

export default React.memo(Badge);
