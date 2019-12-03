import React from 'react';
import { Box, Card, Heading, Text } from 'rebass';
import GatsbyImage from 'gatsby-image';
import GatsbyLink from 'gatsby-link';
import styled from '@emotion/styled/macro';

import AddToCart from '../../components/AddToCart';
import Badge from '../../components/Badge';
import NoImage from '../../components/Icons/NoImage';
import formatPrice from '../../utils/formatPrice';
import strings from './strings.json';

const IndividualProduct = ({ product }) => {
  const {
    priceRange: {
      minVariantPrice: { amount: minPrice },
      maxVariantPrice: { amount: maxPrice },
    },
    availableForSale,
    variants,
    title,
    images,
    tags,
    fields: { shopifyThemePath },
    cartUrl,
  } = product;

  const hasPriceRange = minPrice !== maxPrice;
  const hasOneVariant = variants.length === 1;

  const minDisplayPrice = formatPrice(minPrice);
  const maxDisplayPrice = formatPrice(maxPrice);

  const compareAtPrice = variants[0].compareAtPrice;
  const compareAtPriceFmormatted = formatPrice(variants[0].compareAtPrice);

  let hasSaleBadge = false;

  // Empty styled components used for targeting as selectors
  // https://emotion.sh/docs/styled#targeting-another-emotion-component
  const Image = styled(GatsbyImage)``;
  const Title = styled(Heading)``;

  const CompareAtPrice = styled.strike`
    color: #c0c0c0;
  `;

  const AddToCartStyled = styled(AddToCart)`
    position: absolute;
    cursor: pointer;
    z-index: 1;
    opacity: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  `;

  const AddToCardGroupBox = styled(Box)`
    // Transform image:
    & ${Image} {
      transition-property: all;
      transition-duration: 0.6s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }
    &:hover ${Image} {
      transform: scale(1.05);
      transition-property: all;
      transition-duration: 0.6s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }

    // Show/hide "Add to card" text:
    &:hover ${AddToCartStyled} {
      opacity: 100;
      transform: translateY(-15px);
      transition-property: all;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }
    & ${AddToCartStyled} {
      opacity: 0;
      margin-top: 15px;
      transition-property: all;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }

    &:hover ${Title} {
      opacity: 0;
      transform: translateY(-15px);
      transition-property: all;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }
    & ${Title} {
      opacity: 100;
      transition-property: all;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
    }
  `;

  return (
    <Card px={4} py={2} mb={4} width={[1, 1 / 2, 1 / 3]}>
      <AddToCardGroupBox>
        <Box>
          <Box
            m={2}
            sx={{ display: 'inline-block', position: 'absolute', 'z-index': 9 }}
          >
            {tags.map(tag => {
              if (tag === 'new' && availableForSale) {
                return (
                  <Badge
                    text={strings.new}
                    bgColor="badgeNew"
                    my={1}
                    key={strings.new}
                  />
                );
              } else return '';
            })}
            {variants.map((v, i) => {
              if (
                v.availableForSale &&
                v.compareAtPrice &&
                !hasSaleBadge &&
                availableForSale
              ) {
                hasSaleBadge = true;
                return (
                  <Badge
                    text={strings.sale}
                    my={1}
                    key={`${strings.sale}+${i}`}
                  />
                );
              } else return '';
            })}
            {!availableForSale ? (
              <Badge
                text={strings.soldout}
                width={90}
                height={35}
                bgColor="badgeSoldout"
                format="box"
                my={1}
                key={strings.soldout}
              />
            ) : (
              ''
            )}
          </Box>
          <Box sx={{ overflow: 'hidden', mb: 2 }}>
            <GatsbyLink
              to={shopifyThemePath}
              style={{ textDecoration: 'none' }}
            >
              {images && images.length > 0 ? (
                <Image
                  alt={title}
                  fluid={images['0'].localFile.childImageSharp.fluid}
                />
              ) : (
                <NoImage width="100%" height="100%" color="grey" p={4} />
              )}
            </GatsbyLink>
          </Box>
          <Box sx={{ position: 'relative' }} mb={1}>
            {hasOneVariant ? (
              <AddToCartStyled
                title={strings.addToCart}
                shopifyId={variants[0].shopifyId}
                amount={1}
                cartUrl={cartUrl}
                sx={{
                  color: 'addToCart',
                  bg: 'white',
                  fontFamily: 'body',
                  fontSize: [1, 2, 3],
                  fontWeight: 'normal',
                  lineHeight: '1.25',
                  py: 0,
                }}
              />
            ) : (
              <AddToCartStyled
                isSelectOptions="true"
                title={strings.selectOptions}
                to={shopifyThemePath}
                sx={{
                  color: 'addToCart',
                  ':hover,:focus,.active': {
                    color: 'addToCart',
                    textDecoration: 'none',
                  },
                  bg: 'white',
                  fontFamily: 'body',
                  fontSize: [1, 2, 3],
                  fontWeight: 'normal',
                  lineHeight: '1.25',
                  py: 0,
                }}
              />
            )}

            <Title
              as="h3"
              sx={{
                fontSize: [1, 2, 3],
                fontFamily: 'body',
                fontWeight: 'light',
                color: 'productCollectionTitle',
                py: 0,
              }}
            >
              {title}
            </Title>
          </Box>
          <Text sx={{ color: 'black', fontSize: [1], fontWeight: 'bold' }}>
            {minDisplayPrice} {hasPriceRange && `- ${maxDisplayPrice}`}{' '}
            {hasOneVariant && compareAtPrice > minPrice && (
              <CompareAtPrice>{compareAtPriceFmormatted}</CompareAtPrice>
            )}
          </Text>
        </Box>
      </AddToCardGroupBox>
    </Card>
  );
};

export default IndividualProduct;
