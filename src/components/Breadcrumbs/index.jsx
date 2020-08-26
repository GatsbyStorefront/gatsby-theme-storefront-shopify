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
        <Text as={GatsbyLink} to="/" itemProp="item" variant="link">
          Home
        </Text>
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
            <Text
              as={GatsbyLink}
              to={`${collectionPath}`}
              mr={1}
              itemProp="item"
              variant="link"
            >
              {collectionTitle}
            </Text>
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

export default React.memo(Breadcrumbs);
