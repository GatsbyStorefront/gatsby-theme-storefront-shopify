/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Flex } from 'theme-ui';

const ShoppingCart = (props) => {
  return (
    <Flex
      sx={{
        justifyContent: 'center',
        width: props.width,
        height: props.height,
        color: props.color,
      }}
    >
      <svg
        color={props.color}
        width={props.width ? props.width : '100%'}
        height={props.height ? props.height : '100%'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </Flex>
  );
};

export default ShoppingCart;
