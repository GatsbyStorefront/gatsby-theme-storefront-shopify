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
  query CatalogQuery($handle: String, $enableWebp: Boolean!) {
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
              localFile {
                childImageSharp @include(if: $enableWebp) {
                  fluid(
                    maxWidth: 450
                    maxHeight: 450
                    cropFocus: ATTENTION
                    fit: COVER
                    background: "white"
                    srcSetBreakpoints: [450]
                  ) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
                childImageSharp @skip(if: $enableWebp) {
                  fluid(
                    maxWidth: 450
                    maxHeight: 450
                    cropFocus: ATTENTION
                    fit: COVER
                    background: "white"
                    srcSetBreakpoints: [450]
                  ) {
                    ...GatsbyImageSharpFluid
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
