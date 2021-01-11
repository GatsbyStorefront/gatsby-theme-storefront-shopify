/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainPage from './MainPage';
import strings from './strings.json';

const { pageTitleTemplate } = strings;

export default (props) => {
  const {
    storeName,
    storeDescription,
  } = props.data.store.siteMetadata.gatsbyStorefrontConfig;

  return (
    <>
      <Helmet title={storeName} titleTemplate={pageTitleTemplate} defer={false}>
        <meta name="description" content={storeDescription} />
      </Helmet>
      <MainPage {...props} />
    </>
  );
};

export const mainPageQuery = graphql`
  query MainPageQuery(
    $handles: [String]
    $featuredCollectionsHandles: [String]
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
          src
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

    products: allShopifyProduct(filter: { handle: { in: $handles } }) {
      nodes {
        title
        description
        handle
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
        }
      }
    }
  }
`;
