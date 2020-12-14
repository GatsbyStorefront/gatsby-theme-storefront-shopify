const hasOwnProp = require('has-own-prop');
const R = require('ramda');

const shortcode = require('./src/utils/shortcode-parser');

const productTemplate = require.resolve('./src/templates/product/index.jsx');
const cartTemplate = require.resolve('./src/templates/cart/index.jsx');
const catalogTemplate = require.resolve('./src/templates/catalog/index.jsx');
const mainPageTemplate = require.resolve('./src/templates/main/index.jsx');
const policyTemplate = require.resolve('./src/templates/policy/index.jsx');

const typeDefs = require('./typedefs');

let maxDescriptionSectionsNumber;

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '');
}

const getMainPageHandles = (mainPage) => {
  const handles = [];
  mainPage.forEach((element) => {
    if (element.type === 'collection' || element.type === 'product') {
      handles.push(element.handle);
    } else if (
      (element.type === 'carousel' ||
        element.type === 'section' ||
        element.type === 'header') &&
      element.children.length > 0
    ) {
      element.children.forEach((e) => {
        handles.push(e.handle);
      });
    }
  });
  return handles;
};

const getMainPageFeaturedCollectionsHandles = (mainPage) => {
  const handles = [];
  mainPage.forEach((element) => {
    if (element.type === 'collection' && element.isExpanded === true) {
      handles.push(element.handle);
    }
  });
  return handles;
};

const getShortTagContent = (tag, text) => {
  let tagContent;
  let tagOptions;
  shortcode.parseInContext(text, {
    [tag]: (buf, opts) => {
      tagContent = buf;
      tagOptions = opts;
      return ''; // return but not using it
    },
  });

  if (tagContent) {
    return { content: tagContent, options: tagOptions };
  } else {
    return false;
  }
};

const getSection = (tag, text) => {
  const section = getShortTagContent(tag, text);
  if (section) {
    return { section: section.content, options: section.options };
  } else {
    return false;
  }
};

const getShortDescription = (text) => {
  let shortDescritionTemp;
  return {
    withoutShortDescription: shortcode.parseInContext(text, {
      short_description: (buf, opts) => {
        shortDescritionTemp = buf;
        return ''; // return but not using it
      },
    }),
    shortDescription: shortDescritionTemp,
  };
};

const createProductNode = (options, actions, node) => {
  let { basePath = '', productPageBasePath = 'product' } = options;
  const { createNodeField } = actions;
  basePath = removeTrailingLeadingSlashes(basePath);
  productPageBasePath = removeTrailingLeadingSlashes(productPageBasePath);

  const shopifyProductGidPrefix = 'gid://shopify/Product/';
  const getProductId = (shopifyId) =>
    Buffer.from(shopifyId, 'base64')
      .toString('utf-8')
      .substr(shopifyProductGidPrefix.length);

  createNodeField({
    node,
    name: 'shopifyThemePath',
    value: `${basePath && `/${basePath}`}/${productPageBasePath}/${
      node.handle
    }`,
  });

  createNodeField({
    node,
    name: 'firstImage',
    value: node.images[0] ? node.images[0] : {},
  });

  const sections = [];
  for (let i = 0; i < maxDescriptionSectionsNumber; i += 1) {
    const section = getSection(`section_${i}`, node.descriptionHtml);
    if (section) {
      section.id = i;
      sections.push(section);
    }
  }

  const { withoutShortDescription, shortDescription } = getShortDescription(
    node.descriptionHtml
  );

  createNodeField({
    node,
    name: 'descriptionSections',
    value: sections,
  });

  createNodeField({
    node,
    name: 'shortDescription',
    value: shortDescription || '',
  });

  createNodeField({
    node,
    name: 'withoutShortDescription',
    value: withoutShortDescription || '',
  });

  createNodeField({
    node,
    name: 'shopifyProductId',
    value: getProductId(node.shopifyId) || '',
  });
};

const createCollectionNode = (options, actions, node) => {
  let { basePath = '', collectionPageBasePath = 'collection' } = options;
  const { createNodeField } = actions;
  basePath = removeTrailingLeadingSlashes(basePath);
  collectionPageBasePath = removeTrailingLeadingSlashes(collectionPageBasePath);

  createNodeField({
    node,
    name: 'shopifyThemePath',
    value: `${basePath && `/${basePath}`}/${collectionPageBasePath}/${
      node.handle
    }`,
  });
};

const createShopPolicyNode = (options, actions, node) => {
  let { basePath = '', policyPageBasePath = 'policy' } = options;
  const { createNodeField } = actions;
  basePath = removeTrailingLeadingSlashes(basePath);
  policyPageBasePath = removeTrailingLeadingSlashes(policyPageBasePath);

  createNodeField({
    node,
    name: 'shopifyThemePath',
    value: `${basePath && `/${basePath}`}/${policyPageBasePath}/${node.type}`,
  });
};

const createMainPage = async (
  basePath,
  graphql,
  createPage,
  finalCartPagePath
) => {
  const mainPagePath = `${basePath && `/${basePath}`}/`;
  const mainPageHandles = await graphql(`
    {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            mainPage {
              handle
              type
              isExpanded
              children {
                handle
                type
                isExpanded
              }
            }
          }
        }
      }
    }
  `);
  const mainPageHandlesArray = getMainPageHandles(
    JSON.parse(
      JSON.stringify(
        mainPageHandles.data.site.siteMetadata.gatsbyStorefrontConfig.mainPage
      )
    )
  );
  const mainPageFeaturedCollectionsHandlesArray = getMainPageFeaturedCollectionsHandles(
    JSON.parse(
      JSON.stringify(
        mainPageHandles.data.site.siteMetadata.gatsbyStorefrontConfig.mainPage
      )
    )
  );
  createPage({
    path: mainPagePath,
    component: mainPageTemplate,
    context: {
      handles: mainPageHandlesArray,
      featuredCollectionsHandles: mainPageFeaturedCollectionsHandlesArray,
      cartUrl: finalCartPagePath,
    },
  });
};

const createCollectionsPages = async (
  graphql,
  productsPerCollectionPage,
  createPage,
  finalCartPagePath
) => {
  const queryCollections = await graphql(`
    {
      collections: allShopifyCollection {
        nodes {
          handle
          products {
            id
          }
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `);

  if (
    queryCollections &&
    queryCollections.data &&
    R.hasPath(['collections', 'nodes'], queryCollections.data)
  ) {
    queryCollections.data.collections.nodes.forEach(
      ({ handle, products, fields }) => {
        const { shopifyThemePath } = fields;
        const collectionProductsCount = products.length;
        const productsPerPage = parseInt(productsPerCollectionPage, 10);
        const numPages = Math.ceil(collectionProductsCount / productsPerPage);
        Array.from({
          length: numPages,
        }).forEach((_, i) => {
          createPage({
            path:
              i === 0 ? `${shopifyThemePath}` : `${shopifyThemePath}/${i + 1}`,
            component: catalogTemplate,
            context: {
              handle,
              shopifyThemePath,
              limit: productsPerPage,
              skip: i * productsPerPage,
              numPages,
              currentPage: i + 1,
              cartUrl: finalCartPagePath,
            },
          });
        });
      }
    );
  }
};

const createProductsPages = async (graphql, createPage, finalCartPagePath) => {
  const queryProducts = await graphql(`
    {
      products: allShopifyProduct {
        nodes {
          handle
          fields {
            shopifyThemePath
            shopifyProductId
          }
        }
      }
    }
  `);
  queryProducts.data.products.nodes.forEach(({ handle, fields }) => {
    const { shopifyThemePath, shopifyProductId } = fields;
    createPage({
      path: shopifyThemePath,
      component: productTemplate,
      context: {
        handle,
        productId: shopifyProductId,
        cartUrl: finalCartPagePath,
      },
    });
  });
};

const createPoliciesPages = async (graphql, createPage, finalCartPagePath) => {
  const queryPolicies = await graphql(`
    {
      policies: allShopifyShopPolicy {
        nodes {
          type
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `);
  if (
    queryPolicies &&
    queryPolicies.data &&
    R.hasPath(['policies', 'nodes'], queryPolicies.data)
  ) {
    queryPolicies.data.policies.nodes.forEach(({ type, fields }) => {
      const { shopifyThemePath } = fields;
      createPage({
        path: shopifyThemePath,
        component: policyTemplate,
        context: {
          type,
          cartUrl: finalCartPagePath,
        },
      });
    });
  }
};

exports.onPreInit = (_, pluginOptions) => {
  const product = hasOwnProp(pluginOptions, 'product')
    ? pluginOptions.product
    : {};

  maxDescriptionSectionsNumber = hasOwnProp(
    product,
    'maxDescriptionSectionsNumber'
  )
    ? product.maxDescriptionSectionsNumber
    : 10;
};

exports.onCreateNode = async ({ node, actions, cache }, options) => {
  switch (node.internal.type) {
    case `ShopifyProduct`:
      createProductNode(options, actions, node);
      break;
    case `ShopifyCollection`:
      createCollectionNode(options, actions, node);
      break;
    case `ShopifyShopPolicy`:
      createShopPolicyNode(options, actions, node);
      break;
    default: // do nothing
  }
};

exports.createPages = async ({ graphql, actions }, options) => {
  const gatsbyStorefrontConfig = await graphql(`
    {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            productsPerCollectionPage
          }
        }
      }
    }
  `);
  const {
    productsPerCollectionPage = 9,
  } = gatsbyStorefrontConfig.data.site.siteMetadata.gatsbyStorefrontConfig;

  const { createPage } = actions;
  let { cartPagePath = 'cart', basePath = '' } = options;
  basePath = removeTrailingLeadingSlashes(basePath);
  cartPagePath = removeTrailingLeadingSlashes(cartPagePath);

  const finalCartPagePath = `${basePath && `/${basePath}`}/${cartPagePath}`;
  createPage({
    path: finalCartPagePath,
    component: cartTemplate,
  });

  await createMainPage(basePath, graphql, createPage, finalCartPagePath);
  await createCollectionsPages(
    graphql,
    productsPerCollectionPage,
    createPage,
    finalCartPagePath
  );
  await createProductsPages(graphql, createPage, finalCartPagePath);
  await createPoliciesPages(graphql, createPage, finalCartPagePath);
};

exports.createSchemaCustomization = ({ actions }) => {
  // Here we define types.
  // We need it in case some data wasn't set up, but queries need to pass verification during build process.
  // While build process GatsbyJS extracts queries and checks them against schema (see https://www.gatsbyjs.org/docs/query-extraction/).

  const { createTypes } = actions;
  createTypes(typeDefs);
};
