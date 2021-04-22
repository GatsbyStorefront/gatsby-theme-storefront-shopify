/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Flex, Box, Heading, Text } from 'theme-ui';

import CatalogProducts from './CatalogProducts';
import Pagination from '../../components/Pagination';
import CollectionStats from '../../components/CollectionStats';

function CatalogPage(props) {
  const { limit, skip, cartUrl } = props.pageContext;
  const { title, description } = props.data.collection.nodes[0];
  let products = [];

  props.data.collection.nodes.forEach((node) => {
    products = [...products, ...node.products];
  });

  return (
    <Flex sx={{ flexWrap: 'wrap', px: 2, pt: 3, mx: 'auto', maxWidth: 1300 }}>
      <Flex
        sx={{
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          px: 4,
          py: 2,
        }}
      >
        <Text sx={{ textAlign: 'left' }}>
          <Heading as="h1" sx={{ fontSize: [30, 36, 42] }}>
            {title}
          </Heading>
          <Text sx={{ fontSize: [2, 3] }}>{description}</Text>
        </Text>
        <Text
          sx={{
            textAlign: ['center', 'right'],
            width: ['100%', 'auto'],
            pt: 1,
            fontSize: [1, 2, 3],
          }}
        >
          <CollectionStats
            limit={limit}
            skip={skip}
            productsNum={products.length}
          />
        </Text>
      </Flex>

      <CatalogProducts
        products={products}
        limit={limit}
        skip={skip}
        cartUrl={cartUrl}
      />

      <Box sx={{ width: '100%', px: 4, py: 2 }} key="pagination">
        <Text sx={{ textAlign: 'center' }}>
          <Pagination {...props.pageContext} />
        </Text>
      </Box>
    </Flex>
  );
}

export default CatalogPage;
