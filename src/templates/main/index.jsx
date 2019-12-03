import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainPage from './MainPage';
import Layout from '../../components/Layout';
import strings from './strings.json';
import config from '../../../gatsbystorefront-config';

const { pageTitleTemplate } = strings;
const { storeName, storeDescription } = config;

export default props => {
  return (
    <Layout>
      <Helmet title={storeName} titleTemplate={pageTitleTemplate} defer={false}>
        <meta name="description" content={storeDescription} />
      </Helmet>
      <MainPage {...props} />
    </Layout>
  );
};

export const mainPageQuery = graphql`
  query MainPageQuery($handles: [String]) {
    collections: allShopifyCollection(filter: { handle: { in: $handles } }) {
      nodes {
        handle
        title
        description
        fields {
          shopifyThemePath
        }
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 1300
                maxHeight: 800
                cropFocus: CENTER
                fit: COVER
                background: "white"
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }

    products: allShopifyProduct(filter: { handle: { in: $handles } }) {
      nodes {
        title
        description
        handle
        fields {
          shopifyThemePath
        }
        images {
          altText
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 1300
                maxHeight: 800
                cropFocus: CENTER
                fit: COVER
                background: "white"
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
