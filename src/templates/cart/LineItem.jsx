/** @jsx jsx */
import { jsx } from 'theme-ui';

import React, { useState, useEffect } from 'react';
import { Flex, Box, Image, Text } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';

import ProductCounter from '../../components/ProductCounter';
import NoImage from '../../components/Icons/NoImage';
import RemoveItemIcon from './RemoveItemIcon';
import formatPrice from '../../utils/formatPrice';
import strings from './strings.json';

const { cartItemPriceLabel, cartItemAriaRemoveFromCart } = strings;

const LineItem = (props) => {
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
        sx={{ flexDirection: ['column', 'row'], alignItems: 'top' }}
        {...props}
      >
        <Box
          p={[1, 3]}
          sx={{ position: 'absolute', right: 20, display: ['block', 'none'] }}
        >
          <RemoveItemIcon
            onClick={() => removeItem(id)}
            ml={['29px', 4]}
            aria-hidden
            aria-label={cartItemAriaRemoveFromCart}
            sx={{ cursor: 'pointer', height: 'auto', size: [16, 18, 20] }}
          />
        </Box>
        <Flex
          sx={{
            width: ['100%', '20%', '10%'],
            justifyContent: ['center', 'flex-start'],
          }}
          p={[1, 3]}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={altText}
              sx={{ width: ['130px', '100%'], maxHeight: 130 }}
            />
          ) : (
            <NoImage
              width={['130px', '100%']}
              maxHeight={130}
              color="grey"
              p={4}
            />
          )}
        </Flex>

        <Flex
          sx={{
            width: ['100%', '40%', '50%'],
            justifyContent: ['center', 'flex-start'],
          }}
          p={[1, 3]}
        >
          <Box>
            <Text sx={{ fontSize: [3, 4] }}>{title}</Text>
            {showVariants ? (
              <Flex pt={2} sx={{ opacity: 0.7, fontSize: 2, lineHeight: 1 }}>
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
          sx={{
            width: ['100%', '10%'],
            justifyContent: ['center', 'flex-start'],
          }}
        >
          <Text sx={{ fontSize: [3, 4] }} aria-label={cartItemPriceLabel}>
            {displayPrice}
          </Text>
        </Flex>
        <Flex
          sx={{
            width: ['100%', '20%'],
            justifyContent: ['center', 'flex-start'],
          }}
          p={[1, 3]}
        >
          <Box sx={{ width: ['20%', '100%'] }}>
            <ProductCounter
              currentAmount={quantity}
              decreaseAmount={() => decreaseProductAmount({ id, quantity })}
              increaseAmount={() => increaseProductAmount({ id, quantity })}
            />
          </Box>
        </Flex>
        <Flex
          sx={{
            width: ['100%', '10%'],
            justifyContent: ['center', 'flex-start'],
            display: ['none', 'block'],
          }}
          p={[1, 3]}
        >
          <Box sx={{ display: ['none', 'block'] }}>
            <RemoveItemIcon
              onClick={() => removeItem(id)}
              ml={[1, 4]}
              aria-hidden
              sx={{ cursor: 'pointer', height: 'auto', size: [16, 18, 20] }}
            />
          </Box>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default LineItem;
