import React from 'react';
import { Flex, Box, Heading } from 'rebass';
import { Helmet } from 'react-helmet';

const PolicyPage = props => {
  const { title, body } = props.data.policies.nodes[0];
  const { storeName } = props.data.store.siteMetadata.gatsbyStorefrontConfig;
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

export default PolicyPage;
