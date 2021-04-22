/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import Helmet from 'react-helmet';
import { Flex, Box, Text } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';

function Home() {
  return (
    <>
      <Helmet title="Not found" defer={false} />
      <Flex mt={6} px={[3, null, 4]} sx={{ justifyContent: 'center' }}>
        <Box>
          <Text
            as="h1"
            sx={{ fontSize: 4, fontFamily: 'sans', lineHeight: 1 }}
            color="primary"
          >
            <span role="img" aria-label="thinking">
              🤔
            </span>{' '}
            Hey, there's nothing here!
          </Text>
          <Text
            as="p"
            sx={{ fontFamily: 'sans', lineHeight: 1 }}
            py={3}
            color="primary"
          >
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
