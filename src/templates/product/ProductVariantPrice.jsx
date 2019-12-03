import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from 'rebass';
import { useCurrentVariantContext } from './CurrentVariantContext';

import formatPrice from '../../utils/formatPrice';
import strings from './strings.json';

const ProductVariantPrice = ({ initialDisplayPrice = 0, mb = 0 }) => {
  const { productPriceLabel, productCompareAtPriceLabel } = strings;
  const { currentVariant } = useCurrentVariantContext();
  const [displayPrice, setDisplayPrice] = useState(
    formatPrice(initialDisplayPrice)
  );
  const [compareAtPrice, setCompareAtPrice] = useState();

  useEffect(() => {
    if (currentVariant && currentVariant.hasOwnProperty('price')) {
      currentVariant.price
        ? setDisplayPrice(formatPrice(currentVariant.price))
        : setDisplayPrice(formatPrice(initialDisplayPrice));

      currentVariant.compareAtPrice
        ? setCompareAtPrice(formatPrice(currentVariant.compareAtPrice))
        : setCompareAtPrice(false);
    }
  }, [currentVariant, initialDisplayPrice]);

  return (
    <React.Fragment>
      <Flex>
        {compareAtPrice ? (
          <Box mr={2}>
            <Text fontSize={[1, 2]}>
              {productCompareAtPriceLabel}{' '}
              <Text as="strike">{compareAtPrice}</Text>
            </Text>
          </Box>
        ) : (
          ''
        )}
      </Flex>
      <Flex mb={mb}>
        <Box>
          {productPriceLabel}{' '}
          <Text as="span" color="primary" fontSize={[3, 4]}>
            {displayPrice}
          </Text>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default ProductVariantPrice;
