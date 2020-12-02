import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import CatalogPage from './CatalogPage';

export default (props) => {
  const { title, description } = props.data.collection.nodes[0];
  const { storeName } = props.data.store.siteMetadata.gatsbyStorefrontConfig;
  return (
    <Layout>
      <Helmet title={title} titleTemplate={`%s — ${storeName}`} defer={false}>
        <meta name="description" content={description} />
      </Helmet>
      <CatalogPage {...props} />
    </Layout>
  );
};

export const catalogQuery = graphql`
  query CatalogQuery($handle: String) {
    collection: allShopifyCollection(filter: { handle: { eq: $handle } }) {
      nodes {
        title
        handle
        description
        products {
          id
          shopifyId
          title
          tags
          fields {
            shopifyThemePath
            firstImage {
              altText
              originalSrc
              localFile {
                childImageSharp {
                  resize(base64: true) {
                    src
                    width
                    height
                    aspectRatio
                  }
                }
              }
            }
          }
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants {
            shopifyId
            availableForSale
            compareAtPrice
            price
          }
        }
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
