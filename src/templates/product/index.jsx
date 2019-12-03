import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import ProductPage from './ProductPage';
import Layout from '../../components/Layout';
import { storeName } from '../../../gatsbystorefront-config';

export default props => {
  const { title } = props.data.product;
  return (
    <Layout>
      <Helmet title={title} titleTemplate={`%s — ${storeName}`} defer={false} />
      <ProductPage {...props} />
    </Layout>
  );
};

export const productQuery = graphql`
  query SingleProductQuery($handle: String!) {
    product: shopifyProduct(handle: { eq: $handle }) {
      title
      description
      descriptionHtml
      vendor
      productType
      images {
        id
        altText
        localFile {
          childImageSharp {
            main: fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
            thumbnail: fluid(maxWidth: 200, maxHeight: 200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      variants {
        availableForSale
        compareAtPrice
        title
        price
        shopifyId
        sku
        weight
        weightUnit
        image {
          id
          altText
          localFile {
            childImageSharp {
              main: fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp
              }
              thumbnail: fluid(maxWidth: 200, maxHeight: 200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
      }
    }
    collection: shopifyCollection(
      products: { elemMatch: { handle: { eq: $handle } } }
    ) {
      title
      handle
      fields {
        shopifyThemePath
      }
    }
  }
`;
