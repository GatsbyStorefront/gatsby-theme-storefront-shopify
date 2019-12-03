import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import PolicyPage from './PolicyPage';

export default props => {
  return (
    <Layout>
      <PolicyPage {...props} />
    </Layout>
  );
};

export const policyQuery = graphql`
  query PolicyQuery($type: String) {
    policies: allShopifyShopPolicy(filter: { type: { eq: $type } }) {
      nodes {
        title
        body
      }
    }
  }
`;
