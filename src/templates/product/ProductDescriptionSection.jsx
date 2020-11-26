import React, { useState, useCallback } from 'react';
import { Flex, Box, Heading } from 'rebass';
import { FiPlus, FiMinus } from 'react-icons/fi';

import DescriptionBox from './DescriptionBox';

const ProductDescriptionSection = ({ title, contentHtml, isOpen = false }) => {
  const [show, setShow] = useState(isOpen);

  const toggleShow = useCallback(() => {
    if (!isOpen) {
      setShow((show) => !show);
    }
  }, []);

  return (
    <Flex
      flexDirection="column"
      onClick={!show ? toggleShow : null}
      sx={{ cursor: !show ? 'pointer' : 'auto' }}
    >
      <Box my={30}>
        <Flex
          width={1}
          justifyContent="space-between"
          alignItems="center"
          onClick={show ? toggleShow : null}
          sx={{ cursor: !isOpen ? 'pointer' : 'auto' }}
        >
          <Heading
            as="h4"
            variant="section"
            sx={{ textTransform: 'uppercase' }}
          >
            {title}
          </Heading>
          {show && !isOpen ? <FiMinus size="20" /> : ''}
          {!show ? <FiPlus size="20" /> : ''}
        </Flex>
        {show ? (
          <Box mt={30}>
            <DescriptionBox source={contentHtml} />
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Flex>
  );
};

export default ProductDescriptionSection;
