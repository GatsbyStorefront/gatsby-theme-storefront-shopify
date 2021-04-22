/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Flex, Button, Box, Text } from 'theme-ui';
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
      <Box sx={{ width: 100 / 3 + '%', textAlign: 'left' }}>
        <StyledButton
          onClick={decreaseAmount}
          aria-label={ariaDecreaseButton}
          variant="increase-decrease"
          px={1}
        >
          -
        </StyledButton>
      </Box>

      <Box sx={{ width: 100 / 3 + '%', textAlign: 'center' }} p={1}>
        <Text sx={{ textAlign: 'center' }}>{currentAmount}</Text>
      </Box>
      <Box sx={{ width: 100 / 3 + '%', textAlign: 'right' }}>
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
