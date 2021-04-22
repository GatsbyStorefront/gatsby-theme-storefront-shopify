/** @jsx jsx */
/* eslint no-unused-vars: 0 */
import { jsx } from 'theme-ui';

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled/macro';
import { Flex, Box, Text, Heading, Button } from 'theme-ui';

import ShopifyBackgroundImage from '../../components/ShopifyBackgroundImage';
import substrDescription from '../../utils/substrDescription';

const MainPageCollectionBlock = (props) => {
  const {
    title,
    description,
    image,
    fields: { shopifyThemePath },
  } = props.collection;

  const {
    block,
    textColor = 'primary',
    textBgColor = 'white',
    buttonText = 'Shop now',
    buttonTextColor = 'primary',
    buttonBgColor = 'white',
  } = props;

  return (
    <ShopifyBackgroundImage src={image.src} maxSize="1300">
      <Flex
        m="auto"
        p="1"
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          width: '100%',
          height: '100%',
        }}
      >
        <Box m="auto" sx={{ textAlign: 'center' }}>
          <GatsbyLink
            to={shopifyThemePath}
            sx={{
              color: textColor,
              textAlign: 'center',
              textDecoration: 'none',
              '&:hover,&:focus,&:active': {
                color: textColor,
                textDecoration: 'none',
              },
            }}
          >
            <Heading
              as="h2"
              sx={{ textTransform: 'uppercase', fontSize: [30, 36, 42] }}
            >
              {block.name ? block.name : title}
            </Heading>
            <Text
              mt="3"
              sx={{ display: ['none', 'block'], fontSize: [1, 2, 3] }}
            >
              {block.description
                ? block.description
                : substrDescription(description, 80)}
            </Text>
            <Button
              variant="shopNow"
              sx={{
                bg: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </Button>
          </GatsbyLink>
        </Box>
      </Flex>
    </ShopifyBackgroundImage>
  );
};

export default MainPageCollectionBlock;
