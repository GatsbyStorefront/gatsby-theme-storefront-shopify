import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import Page from './Page';

export default props => {
  return (
    <Layout>
      <Page {...props} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query PageQuery($handle: String) {
    pages: allShopifyPage(filter: { handle: { eq: $handle } }) {
      nodes {
        body
        handle
        title
      }
    }
  }
`;
