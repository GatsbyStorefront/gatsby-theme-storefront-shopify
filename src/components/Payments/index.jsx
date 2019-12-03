import React from 'react';
import { Flex, Box } from 'rebass';

import PaymentIcon from 'react-payment-icons-inline';

const Payments = ({ payments }) => {
  return (
    <Flex>
      {payments.map(p => {
        return (
          <Box mr={[1, 2]} key={p}>
            <PaymentIcon
              id={p}
              icon={p}
              key={'icon-' + p}
              transparent={false}
              style={{ width: 40 }}
            />
          </Box>
        );
      })}
    </Flex>
  );
};

export default Payments;
