import React from 'react';
import { Flex, Box, Heading, Text } from 'rebass';
import { Helmet } from 'react-helmet';

import { storeName } from '../../../../gatsbystorefront-config';
import GatsbyLink from 'gatsby-link';

const ArticlePage = props => {
  const {
    title,
    contentHtml,
    publishedAt,
    blog: {
      fields: { shopifyThemePath: blogShopifyThemePath },
      title: blogTitle,
    },
  } = props.data.articles.nodes[0];

  return (
    <Flex
      flexDirection="column"
      px={2}
      pt={3}
      mx="auto"
      style={{ maxWidth: 1300 }}
      alignItems="center"
    >
      <Helmet title={title} titleTemplate={`%s — ${storeName}`} defer={false}>
        <meta name="description" content={title} />
      </Helmet>

      <Heading as="h1" fontSize={[30, 36, 42]} m={3}>
        {title}
      </Heading>

      <Text mb={3} fontSize={2}>
        Published in{' '}
        <Text as={GatsbyLink} to={blogShopifyThemePath}>
          {blogTitle}
        </Text>{' '}
        on {publishedAt}
      </Text>

      <Box
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        sx={{
          overflow: ['scroll', 'hidden'],
          maxWidth: '800px',
          width: ['360px', 'auto'],
          mx: 3,
        }}
      ></Box>
    </Flex>
  );
};

export default ArticlePage;
