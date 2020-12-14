import React from 'react';
import { Flex, Box, Heading, Text } from 'rebass';

import CatalogProducts from '../catalog/CatalogProducts';

const MainPageFeaturedCollectionBlock = ({
  block,
  products,
  skip = 0,
  cartUrl,
}) => {
  const { name, description, limit = 3 } = block;
  return (
    <Box pt={3} mx="auto" style={{ maxWidth: 1300 }}>
      <Heading
        as="h3"
        fontSize={[30, 36, 42]}
        sx={{ textTransform: 'uppercase' }}
        textAlign="center"
      >
        {name}
      </Heading>
      <Text
        fontSize={[1, 2, 3]}
        sx={{ textTransform: 'uppercase' }}
        textAlign="center"
      >
        {description}
      </Text>
      <Flex flexWrap="wrap">
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
