/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainPage from './MainPage';
import Layout from '../../components/Layout';
import strings from './strings.json';

const { pageTitleTemplate } = strings;

export default (props) => {
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
  query MainPageQuery(
    $handles: [String]
    $featuredCollectionsHandles: [String]
    $enableWebp: Boolean!
  ) {
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
              fluid(maxWidth: 1300) {
                ...GatsbyImageSharpFluid_withWebp
                presentationHeight
                presentationWidth
              }
            }
            childImageSharp @skip(if: $enableWebp) {
              fluid(maxWidth: 1300) {
                ...GatsbyImageSharpFluid
                presentationHeight
                presentationWidth
              }
            }
          }
        }
      }
    }

    feautiredCollections: allShopifyCollection(
      filter: { handle: { in: $featuredCollectionsHandles } }
    ) {
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
                    cropFocus: ATTENTION
                    fit: COVER
                    srcSetBreakpoints: [450]
                  ) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
                childImageSharp @skip(if: $enableWebp) {
                  fluid(
                    maxWidth: 450
                    cropFocus: ATTENTION
                    fit: COVER
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
                fluid(maxWidth: 1300, cropFocus: ATTENTION, fit: OUTSIDE) {
                  ...GatsbyImageSharpFluid_withWebp
                  presentationHeight
                  presentationWidth
                }
              }
              childImageSharp @skip(if: $enableWebp) {
                fluid(maxWidth: 1300, cropFocus: ATTENTION, fit: OUTSIDE) {
                  ...GatsbyImageSharpFluid
                  presentationHeight
                  presentationWidth
                }
              }
            }
          }
          descriptionSections {
            id
          }
          shortDescription
        }
      }
    }

    store: site {
      siteMetadata {
        gatsbyStorefrontConfig {
          storeName
          storeDescription
          gatsbyImageProps {
            loading
            fadeIn
            durationFadeIn
          }
        }
      }
    }
  }
`;
