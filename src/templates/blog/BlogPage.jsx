import React from 'react';
import GatsbyLink from 'gatsby-link';
import { Flex, Box, Text, Heading } from 'rebass';

import Pagination from '../../components/Pagination';
import substrDescription from '../../utils/substrDescription.js';

const BlogPage = ({ blogTitle, ...props }) => {
  return (
    <Flex
      flexDirection="column"
      px={2}
      pt={3}
      mx="auto"
      style={{ maxWidth: 1300 }}
      alignItems="center"
    >
      <Heading as="h1" fontSize={[30, 36, 42]} m={3}>
        {blogTitle}
      </Heading>

      {props.data.articles.nodes.map(article => {
        let {
          shopifyId,
          title,
          excerpt,
          content,
          publishedAt,
          fields: { shopifyThemePath },
        } = article;

        return (
          <Flex
            key={shopifyId}
            flexDirection="column"
            sx={{
              maxWidth: '800px',
              width: [370, '100%'],
              mx: 3,
              my: 3,
            }}
          >
            <Box my={2}>
              <Heading
                as={GatsbyLink}
                to={shopifyThemePath}
                variant="link"
                fontSize={[30, 36]}
              >
                {title}
              </Heading>
            </Box>
            <Box fontSize={2}>{publishedAt}</Box>
            <Box>{excerpt ? excerpt : substrDescription(content, 500)}</Box>
          </Flex>
        );
      })}
      <Box width={1} px={4} py={2} key="pagination">
        <Text textAlign="center">
          <Pagination {...props.pageContext} />
        </Text>
      </Box>
    </Flex>
  );
};

export default BlogPage;
