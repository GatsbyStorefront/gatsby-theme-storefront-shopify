import React from 'react';
import { Box, Text } from 'rebass';
import GatsbyLink from 'gatsby-link';

const Breadcrumbs = ({
  productTitle,
  collectionTitle,
  collectionPath,
  separator,
}) => {
  return (
    <Box fontSize={[2]} itemScope itemType="https://schema.org/BreadcrumbList">
      <Box
        as="span"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
      >
        <GatsbyLink to="/" itemProp="item">
          <Text as="span" itemProp="name" variant="link">
            Home
          </Text>
        </GatsbyLink>
      </Box>

      {collectionPath && collectionTitle ? (
        <Box as="span">
          <Text as="span" mx={1} variant="link">
            {separator}
          </Text>
          <Box
            as="span"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <GatsbyLink to={`/${collectionPath}`} mr={1} itemProp="item">
              <Text as="span" itemProp="name" variant="link">
                {collectionTitle}
              </Text>
            </GatsbyLink>
          </Box>
        </Box>
      ) : (
        ''
      )}

      {productTitle ? (
        <Box as="span">
          <Text as="span" mx={1}>
            {separator}
          </Text>
          <Box
            as="span"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Text as="span" itemProp="name">
              {productTitle}
            </Text>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Breadcrumbs;
