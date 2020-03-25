import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainPage from './MainPage';
import Layout from '../../components/Layout';
import strings from './strings.json';

const { pageTitleTemplate } = strings;

export default props => {
  const {
    storeName,
    storeDescription,
  } = props.data.store.siteMetadata.gatsbyStorefrontConfig;

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
  query MainPageQuery($handles: [String], $enableWebp: Boolean!) {
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
            childImageSharp @include(if: $enableWebp) {
              fluid(
                maxWidth: 1300
                maxHeight: 800
                cropFocus: CENTER
                fit: COVER
                background: "white"
                webpQuality: 85
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            childImageSharp @skip(if: $enableWebp) {
              fluid(
                maxWidth: 1300
                maxHeight: 800
                cropFocus: CENTER
                fit: COVER
                background: "white"
                webpQuality: 85
              ) {
                ...GatsbyImageSharpFluid
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
          firstImage {
            altText
            localFile {
              childImageSharp @include(if: $enableWebp) {
                fluid(
                  maxWidth: 1300
                  maxHeight: 800
                  cropFocus: CENTER
                  fit: COVER
                  background: "white"
                  webpQuality: 85
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              childImageSharp @skip(if: $enableWebp) {
                fluid(
                  maxWidth: 1300
                  maxHeight: 800
                  cropFocus: CENTER
                  fit: COVER
                  background: "white"
                  webpQuality: 85
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    store: site {
      siteMetadata {
        gatsbyStorefrontConfig {
          storeName
          storeDescription
        }
      }
    }
  }
`;
