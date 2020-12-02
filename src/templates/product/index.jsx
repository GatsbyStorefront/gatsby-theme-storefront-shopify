import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import ProductPage from './ProductPage';
import Layout from '../../components/Layout';

export default (props) => {
  const { title } = props.data.product;
  const { storeName } = props.data.store.siteMetadata.gatsbyStorefrontConfig;
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
        originalSrc
        localFile {
          childImageSharp {
            main: resize(base64: true) {
              src
              width
              height
              aspectRatio
            }
          }
        }
      }
      cmsConnection {
        shortDescription
        descriptionHtml
        descriptionSections {
          title
          contentHtml
          isOpen
          orderPriority
        }
      }
      reviewsConnection {
        id
        productId
        title
        content
        score
        createdAt
        name
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
    store: site {
      siteMetadata {
        gatsbyStorefrontConfig {
          storeName
          payments
          shareButtons
          gatsbyImageProps {
            loading
            fadeIn
            durationFadeIn
          }
          productImagesCarouselProps {
            naturalSlideHeight
            naturalSlideWidth
          }
          reviewsNumberPerPage
        }
      }
    }
  }
`;
