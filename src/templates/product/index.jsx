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
      fields {
        descriptionSections {
          id
          section
          options {
            title
            isOpen
          }
        }
        shortDescription
        withoutShortDescription
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

    yotpoReviews: allYotpoProductReview(
      filter: { productIdentifier: { eq: $handle } }
    ) {
      nodes {
        name
        title
        content
        score
        createdAt
      }
    }

    airtableReviews: allAirtable(
      filter: { table: { eq: "Reviews" }, data: { handle: { eq: $handle } } }
    ) {
      nodes {
        data {
          name
          title
          content
          score
          createdAt
        }
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
