import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import CatalogPage from './CatalogPage';
import { storeName } from '../../../gatsbystorefront-config';

export default props => {
  const { title, description } = props.data.collection.nodes[0];
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
          images {
            altText
            localFile {
              childImageSharp {
                fluid(
                  maxWidth: 450
                  maxHeight: 450
                  cropFocus: ATTENTION
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
  }
`;
