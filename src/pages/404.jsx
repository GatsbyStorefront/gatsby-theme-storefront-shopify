import React from 'react';
import Helmet from 'react-helmet';
import { Flex, Box, Text } from 'rebass';
import GatsbyLink from 'gatsby-link';

function Home() {
  return (
    <>
      <Helmet title="Not found" defer={false} />
      <Flex mt={6} px={[3, null, 4]} justifyContent="center">
        <Box>
          <Text
            as="h1"
            fontSize={4}
            fontFamily="sans"
            color="primary"
            lineHeight={1}
          >
            <span role="img" aria-label="thinking">
              🤔
            </span>{' '}
            Hey, there's nothing here!
          </Text>
          <Text as="p" fontFamily="sans" py={3} color="primary" lineHeight={1}>
            How about checking out the{' '}
            <Text as={GatsbyLink} to="/">
              first page
            </Text>
            ?
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default Home;
