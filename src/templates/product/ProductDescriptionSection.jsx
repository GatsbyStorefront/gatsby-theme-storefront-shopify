/** @jsx jsx */
import { jsx } from 'theme-ui';

import React, { useState, useCallback } from 'react';
import { Flex, Box, Heading } from 'theme-ui';
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
      onClick={!show ? toggleShow : null}
      sx={{ flexDirection: 'column', cursor: !show ? 'pointer' : 'auto' }}
    >
      <Box my={30}>
        <Flex
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: !isOpen ? 'pointer' : 'auto',
          }}
          onClick={show ? toggleShow : null}
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
