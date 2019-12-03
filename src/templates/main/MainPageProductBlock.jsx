/** @jsx jsx */
import React from 'react';
import GatsbyImage from 'gatsby-image';
import { Link as GatsbyLink } from 'gatsby';
import { jsx } from 'theme-ui';
import styled from '@emotion/styled/macro';
import { Flex, Box, Text, Heading } from 'rebass';

import substrDescription from '../../utils/substrDescription';

const Image = styled(GatsbyImage)``;

const StyledBox = styled(Box)`
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
`;

const MainPageProductBlock = props => {
  const {
    title,
    description,
    images,
    fields: { shopifyThemePath },
  } = props.product;
  const { textColor = 'primary', textBgColor = 'white' } = props;
  return (
    <StyledBox sx={{ position: 'relative' }}>
      <Box sx={{ overflow: 'hidden' }}>
        {images ? (
          <Image
            fluid={images[0].localFile.childImageSharp.fluid}
            alt={title}
          />
        ) : (
          <Box pt="60%" />
        )}
      </Box>

      <Box
        sx={{
          position: ['absolute'],
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Flex
          sx={{
            flexDirection: ['column'],
            justifyContent: 'flex-end',
            alignItems: ['center', 'flex-start'],
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            width={['auto', 1 / 3]}
            sx={{
              ml: [1, '5%'],
              my: ['auto', '5%'],
              backgroundColor: [textBgColor, 'transparent'],
              opacity: [0.8, 1],
              px: ['3%', 0],
              py: ['2%', 0],
            }}
          >
            {' '}
            <GatsbyLink
              to={shopifyThemePath}
              sx={{
                color: textColor,
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
                textAlign={['center', 'left']}
              >
                {substrDescription(title, 30)}
              </Heading>
              <Text fontSize={[1, 2, 3]} sx={{ display: ['none', 'block'] }}>
                {substrDescription(description, 80)}
              </Text>
            </GatsbyLink>
          </Box>
        </Flex>
      </Box>
    </StyledBox>
  );
};

export default MainPageProductBlock;
