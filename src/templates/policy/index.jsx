import React from 'react';
import { graphql } from 'gatsby';

import PolicyPage from './PolicyPage';

export default (props) => {
  return <PolicyPage {...props} />;
};

export const policyQuery = graphql`
  query PolicyQuery($type: String) {
    policies: allShopifyShopPolicy(filter: { type: { eq: $type } }) {
      nodes {
        title
        body
      }
    }
    store: site {
      siteMetadata {
        gatsbyStorefrontConfig {
          storeName
        }
      }
    }
  }
`;
