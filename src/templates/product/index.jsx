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
  query SingleProductQuery($handle: String!, $enableWebp: Boolean!) {
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
          childImageSharp @include(if: $enableWebp) {
            main: fluid(maxWidth: 800, srcSetBreakpoints: [400, 800]) {
              ...GatsbyImageSharpFluid_withWebp
              presentationHeight
              presentationWidth
            }
            thumbnail: fluid(
              maxWidth: 90
              maxHeight: 90
              srcSetBreakpoints: [90]
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          childImageSharp @skip(if: $enableWebp) {
            main: fluid(maxWidth: 800, srcSetBreakpoints: [400, 800]) {
              ...GatsbyImageSharpFluid
              presentationHeight
              presentationWidth
            }
            thumbnail: fluid(
              maxWidth: 90
              maxHeight: 90
              srcSetBreakpoints: [90]
            ) {
              ...GatsbyImageSharpFluid
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
