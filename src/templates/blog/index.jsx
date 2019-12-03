import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '../../components/Layout';
import BlogPage from './BlogPage';
import { storeName } from '../../../gatsbystorefront-config';

export default props => {
  const { title: blogTitle } = props.data.blog.nodes[0];

  return (
    <Layout>
      <Helmet
        title={blogTitle}
        titleTemplate={`%s — ${storeName}`}
        defer={false}
      >
        <meta name="description" content={blogTitle} />
      </Helmet>
      <BlogPage {...props} blogTitle={blogTitle} />
    </Layout>
  );
};

export const articlesQuery = graphql`
  query BlogQuery($shopifyId: String!, $limit: Int, $skip: Int) {
    articles: allShopifyArticle(
      filter: { blog: { shopifyId: { eq: $shopifyId } } }
      limit: $limit
      skip: $skip
      sort: { fields: publishedAt }
    ) {
      nodes {
        shopifyId
        title
        excerpt
        content
        publishedAt(formatString: "ddd MMMM Do, YYYY")
        fields {
          shopifyThemePath
        }
      }
    }
    blog: allShopifyBlog(filter: { shopifyId: { eq: $shopifyId } }) {
      nodes {
        shopifyId
        title
        fields {
          shopifyThemePath
        }
      }
    }
  }
`;
