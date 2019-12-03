import React from 'react';
import { Flex, Button, Box, Text } from 'rebass';
import styled from '@emotion/styled';

import strings from './strings.json';

const { ariaIncreaseButton, ariaDecreaseButton } = strings;

const StyledButton = styled(Button)`
  width: 20px;
  &:focus {
    outline: none;
  }
`;

function ProductCounter({ currentAmount, increaseAmount, decreaseAmount }) {
  return (
    <Flex sx={{ borderBottom: '1px', borderBottomStyle: 'solid' }}>
      <Box width={1 / 3} textAlign="left">
        <StyledButton
          onClick={decreaseAmount}
          aria-label={ariaDecreaseButton}
          variant="increase-decrease"
          px={1}
          outline="none"
        >
          -
        </StyledButton>
      </Box>

      <Box width={1 / 3} textAlign="center" p={1}>
        <Text textAlign="center">{currentAmount}</Text>
      </Box>
      <Box width={1 / 3} textAlign="right">
        <StyledButton
          onClick={increaseAmount}
          aria-label={ariaIncreaseButton}
          variant="increase-decrease"
          px={1}
        >
          +
        </StyledButton>
      </Box>
    </Flex>
  );
}

export default ProductCounter;
