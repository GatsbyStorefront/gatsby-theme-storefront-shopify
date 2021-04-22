/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Flex, Box, Heading, Text } from 'theme-ui';

import CatalogProducts from '../catalog/CatalogProducts';

const MainPageFeaturedCollectionBlock = ({
  block,
  products,
  skip = 0,
  cartUrl,
}) => {
  const { name, description, limit = 3 } = block;
  return (
    <Box pt={3} mx="auto" sx={{ maxWidth: 1300 }}>
      <Heading
        as="h3"
        sx={{
          textTransform: 'uppercase',
          fontSize: [30, 36, 42],
          textAlign: 'center',
        }}
      >
        {name}
      </Heading>
      <Text
        as="div"
        sx={{
          textTransform: 'uppercase',
          fontSize: [1, 2, 3],
          textAlign: 'center',
        }}
      >
        {description}
      </Text>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <CatalogProducts
          products={products}
          limit={limit || 3}
          skip={skip}
          cartUrl={cartUrl}
        />
      </Flex>
    </Box>
  );
};

export default MainPageFeaturedCollectionBlock;
