/** @jsx jsx */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { jsx } from 'theme-ui';
import { Flex, Box, Text, Heading, Button } from 'rebass';

import ShopifyBackgroundImage from '../../components/ShopifyBackgroundImage';
import substrDescription from '../../utils/substrDescription';

const MainPageProductBlock = (props) => {
  const {
    title,
    description,
    fields: {
      shopifyThemePath,
      firstImage,
      descriptionSections,
      shortDescription,
    },
  } = props.product;

  const {
    block,
    textColor = 'primary',
    textBgColor = 'white',
    buttonText = 'Shop now',
    buttonTextColor = 'primary',
    buttonBgColor = 'white',
  } = props;

  return (
    <ShopifyBackgroundImage src={firstImage.originalSrc} maxSize="400">
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
        <Box m="auto" textAlign="center">
          <GatsbyLink
            to={shopifyThemePath}
            sx={{
              color: textColor,
              textAlign: 'center',
              textDecoration: 'none',
              ':hover,:focus,.active': {
                color: textColor,
                textDecoration: 'none',
              },
            }}
          >
            <Heading
              as="h2"
              fontSize={[30, 36, 42]}
              sx={{ textTransform: 'uppercase' }}
            >
              {block.name ? block.name : substrDescription(title, 30)}
            </Heading>
            <Text fontSize={[1, 2, 3]} sx={{ display: ['none', 'block'] }}>
              {block.description ? (
                block.description
              ) : (
                <>
                  {!descriptionSections || descriptionSections.length > 0 ? (
                    <>
                      {shortDescription
                        ? substrDescription(shortDescription, 80)
                        : ''}
                    </>
                  ) : (
                    <>
                      {shortDescription
                        ? substrDescription(shortDescription, 80)
                        : substrDescription(description, 80)}
                    </>
                  )}
                </>
              )}
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

export default MainPageProductBlock;
