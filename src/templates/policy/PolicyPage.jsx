/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Flex, Box, Heading } from 'theme-ui';
import { Helmet } from 'react-helmet';

const PolicyPage = (props) => {
  const { title, body } = props.data.policies.nodes[0];
  const { storeName } = props.data.store.siteMetadata.gatsbyStorefrontConfig;
  return (
    <Flex px={2} pt={3} mx="auto" sx={{ flexWrap: 'wrap', maxWidth: 1300 }}>
      <Helmet title={title} titleTemplate={`%s — ${storeName}`} defer={false}>
        <meta name="description" content={title} />
      </Helmet>
      <Heading as="h1" sx={{ fontSize: [30, 36, 42] }} my={3}>
        {title}
      </Heading>
      <Box dangerouslySetInnerHTML={{ __html: body }}></Box>
    </Flex>
  );
};

export default PolicyPage;
