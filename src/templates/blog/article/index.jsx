import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../../components/Layout';
import ArticlePage from './ArticlePage';

export default props => {
  return (
    <Layout>
      <ArticlePage {...props} />
    </Layout>
  );
};

export const articlesQuery = graphql`
  query ArticlesQuery($shopifyId: String!) {
    articles: allShopifyArticle(filter: { shopifyId: { eq: $shopifyId } }) {
      nodes {
        title
        contentHtml
        publishedAt(formatString: "ddd MMMM Do, YYYY")
        blog {
          fields {
            shopifyThemePath
          }
          title
        }
      }
    }
  }
`;
