import React, { useState, useEffect } from 'react';
import { Flex, Box, Image, Text } from 'rebass';
import { useStaticQuery, graphql } from 'gatsby';

import ProductCounter from '../../components/ProductCounter';
import NoImage from '../../components/Icons/NoImage';
import RemoveItemIcon from './RemoveItemIcon';
import formatPrice from '../../utils/formatPrice';
import strings from './strings.json';

const { cartItemPriceLabel, cartItemAriaRemoveFromCart } = strings;

const LineItem = props => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            locales
            currency
          }
        }
      }
    }
  `);
  const { locales, currency } = data.site.siteMetadata.gatsbyStorefrontConfig;

  const {
    lineItem,
    decreaseProductAmount,
    increaseProductAmount,
    removeItem,
  } = props;
  const { quantity, title, variant, id } = lineItem;

  const { selectedOptions } = variant;

  const [imageSrc, setImageSrc] = useState();
  const [altText, setAltText] = useState();
  const [options, setOptions] = useState();
  const [showVariants, setShowVariants] = useState();

  useEffect(() => {
    if (variant.image != null) {
      const { src, text } = variant.image;
      setImageSrc(src);
      setAltText(text);
    }
  }, [variant.image]);

  useEffect(() => {
    setOptions(selectedOptions);
    setShowVariants(
      selectedOptions.length > 0 &&
        selectedOptions[0].name !== 'Title' &&
        selectedOptions[0].values !== 'Default Title'
    );
  }, [selectedOptions]);

  const displayPrice = formatPrice(Number(variant.price), locales, currency);

  return (
    <React.Fragment>
      <Flex
        flexDirection={['column', 'row']}
        alignItems="top"
        fontFamily="body"
        {...props}
      >
        <Box
          p={[1, 3]}
          sx={{ position: 'absolute', right: 20 }}
          display={['block', 'none']}
        >
          <RemoveItemIcon
            onClick={() => removeItem(id)}
            ml={['29px', 4]}
            aria-hidden
            aria-label={cartItemAriaRemoveFromCart}
            size={[16, 18, 20]}
            sx={{ cursor: 'pointer', height: 'auto' }}
          />
        </Box>
        <Flex
          width={[1, 2 / 10, 1 / 10]}
          p={[1, 3]}
          justifyContent={['center', 'flex-start']}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={altText}
              width={['130px', 1]}
              maxHeight={'130px'}
            />
          ) : (
            <NoImage
              width={['130px', 1]}
              maxHeight={'130px'}
              color="grey"
              p={4}
            />
          )}
        </Flex>

        <Flex
          width={[1, 4 / 10, 5 / 10]}
          p={[1, 3]}
          justifyContent={['center', 'flex-start']}
        >
          <Box>
            <Text fontSize={[3, 4]}>{title}</Text>
            {showVariants ? (
              <Flex
                pt={2}
                fontSize={[2]}
                lineHeight={1}
                style={{ opacity: 0.7 }}
              >
                {options.map((option, index) => {
                  return (
                    <Box key={option.name} mr={2}>
                      {option.value}
                      {index + 1 < options.length ? ',' : ''}
                    </Box>
                  );
                })}
              </Flex>
            ) : (
              ''
            )}
          </Box>
        </Flex>

        <Flex
          width={[1, 1 / 10]}
          p={[1, 3]}
          justifyContent={['center', 'flex-start']}
        >
          <Text fontSize={[3, 4]} aria-label={cartItemPriceLabel}>
            {displayPrice}
          </Text>
        </Flex>
        <Flex
          width={[1, 2 / 10]}
          p={[1, 3]}
          justifyContent={['center', 'flex-start']}
        >
          <Box width={[1 / 5, 1]}>
            <ProductCounter
              currentAmount={quantity}
              decreaseAmount={() => decreaseProductAmount({ id, quantity })}
              increaseAmount={() => increaseProductAmount({ id, quantity })}
            />
          </Box>
        </Flex>
        <Flex
          width={[1, 1 / 10]}
          p={[1, 3]}
          display={['none', 'block']}
          justifyContent={['center', 'flex-start']}
        >
          <Box display={['none', 'block']}>
            <RemoveItemIcon
              onClick={() => removeItem(id)}
              display={['none', 'block']}
              ml={[1, 4]}
              aria-hidden
              size={[16, 18, 20]}
              sx={{ cursor: 'pointer', height: 'auto' }}
            />
          </Box>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default LineItem;
