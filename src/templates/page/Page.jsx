import React from 'react';
import { Flex, Box, Heading } from 'rebass';
import { Helmet } from 'react-helmet';

import { storeName } from '../../../gatsbystorefront-config';

const Page = props => {
  const { title, body } = props.data.pages.nodes[0];
  return (
    <Flex flexWrap="wrap" px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
      <Helmet title={title} titleTemplate={`%s — ${storeName}`} defer={false}>
        <meta name="description" content={title} />
      </Helmet>
      <Heading as="h1" fontSize={[30, 36, 42]} my={3}>
        {title}
      </Heading>
      <Box dangerouslySetInnerHTML={{ __html: body }}></Box>
    </Flex>
  );
};

export default Page;
