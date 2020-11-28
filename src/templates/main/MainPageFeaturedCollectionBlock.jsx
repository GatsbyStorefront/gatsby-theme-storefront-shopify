import React from 'react';
import { Flex, Box, Heading, Text } from 'rebass';

import CatalogProducts from '../catalog/CatalogProducts';

const MainPageFeaturedCollectionBlock = ({
  block,
  products,
  limit = 3,
  skip = 0,
  cartUrl,
  gatsbyImageProps,
}) => {
  const { name, description } = block;
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
          limit={limit}
          skip={skip}
          cartUrl={cartUrl}
          gatsbyImageProps={gatsbyImageProps}
        />
      </Flex>
    </Box>
  );
};

export default MainPageFeaturedCollectionBlock;
