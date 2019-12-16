const productTemplate = require.resolve('./src/templates/product/index.jsx');
const cartTemplate = require.resolve('./src/templates/cart/index.jsx');
const catalogTemplate = require.resolve('./src/templates/catalog/index.jsx');
const mainPageTemplate = require.resolve('./src/templates/main/index.jsx');
const policyTemplate = require.resolve('./src/templates/policy/index.jsx');
const blogTemplate = require.resolve('./src/templates/blog/index.jsx');
const pageTemplate = require.resolve('./src/templates/page/index.jsx');
const articleTemplate = require.resolve(
  './src/templates/blog/article/index.jsx'
);

const gatsbyStorefrontConfig = require('./gatsbystorefront-config');

const {
  productsPerCollectionPage = 9,
  articlesPerBlogPage = 6,
} = gatsbyStorefrontConfig;

// Used as workaround (together with cache) to store and access Blogs ids and handles while creating fields for Articles
let availableBlogs = [];

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '');
}

const getMainPageHandles = mainPage => {
  let handles = [];
  mainPage.forEach(element => {
    if (element.type === 'collection' || element.type === 'product') {
      handles.push(element.handle);
    } else if (element.type === 'carousel' || element.type === 'header') {
      element.children.forEach(e => {
        handles.push(e.handle);
      });
    }
  });
  return handles;
};

exports.onCreateNode = async ({ node, actions, cache }, options) => {
  if (node.internal.type === `ShopifyProduct`) {
    let { basePath = '', productPageBasePath = 'product' } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    productPageBasePath = removeTrailingLeadingSlashes(productPageBasePath);

    // Todo: Improve the way this is done. Maybe using the config.json file.
    createNodeField({
      node,
      name: 'shopifyThemePath',
      value: `${basePath && `/${basePath}`}/${productPageBasePath}/${
        node.handle
      }`,
    });
  }

  if (node.internal.type === `ShopifyCollection`) {
    let { basePath = '', collectionPageBasePath = 'collection' } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    collectionPageBasePath = removeTrailingLeadingSlashes(
      collectionPageBasePath
    );

    // Todo: Improve the way this is done. Maybe using the config.json file.
    createNodeField({
      node,
      name: 'shopifyThemePath',
      value: `${basePath && `/${basePath}`}/${collectionPageBasePath}/${
        node.handle
      }`,
    });
  }

  if (node.internal.type === `ShopifyShopPolicy`) {
    let { basePath = '', policyPageBasePath = 'policy' } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    policyPageBasePath = removeTrailingLeadingSlashes(policyPageBasePath);

    // Todo: Improve the way this is done. Maybe using the config.json file.
    createNodeField({
      node,
      name: 'shopifyThemePath',
      value: `${basePath && `/${basePath}`}/${policyPageBasePath}/${node.type}`,
    });
  }

  if (node.internal.type === `ShopifyPage`) {
    let { basePath = '', pageBasePath = 'pages' } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    pageBasePath = removeTrailingLeadingSlashes(pageBasePath);

    // Todo: Improve the way this is done. Maybe using the config.json file.
    createNodeField({
      node,
      name: 'shopifyThemePath',
      value: `${basePath && `/${basePath}`}${pageBasePath &&
        `/${pageBasePath}`}/${node.handle}`,
    });
  }

  if (node.internal.type === `ShopifyBlog`) {
    let { basePath = '', blogPageBasePath = 'blog' } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    if (blogPageBasePath.length > 0) {
      blogPageBasePath = removeTrailingLeadingSlashes(blogPageBasePath);
    }

    let nodeUrlArray = node.url.split('/');
    let blogHandle = nodeUrlArray[nodeUrlArray.length - 1];

    // As while creating only new nodes we do not know about already existing
    // We need to store information about blogs received early in cache.
    // 1. Push new blogs to array
    availableBlogs.push({
      shopifyId: node.shopifyId,
      handle: blogHandle,
    });
    // 2. Receive already known blogs from cache
    let blogs = await cache.get('availableBlogs');
    // 3. Concat new blogs with already known
    if (blogs && blogs.length > 0) {
      availableBlogs = availableBlogs.concat(blogs);
    }
    // 4. Write back to cache
    await cache.set('availableBlogs', availableBlogs);

    // Todo: Improve the way this is done. Maybe using the config.json file.
    createNodeField({
      node,
      name: 'shopifyThemePath',
      value: `${basePath && `/${basePath}`}${blogPageBasePath &&
        `/${blogPageBasePath}`}/${blogHandle}`,
    });
  }

  if (node.internal.type === `ShopifyArticle`) {
    let {
      basePath = '',
      articlePageBasePath = 'article',
      blogPageBasePath = 'blog',
    } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    if (articlePageBasePath.length > 0) {
      articlePageBasePath = removeTrailingLeadingSlashes(articlePageBasePath);
    }

    let nodeArticleUrlArray = node.url.split('/');
    let articleHandle = nodeArticleUrlArray[nodeArticleUrlArray.length - 1];

    let blogs = await cache.get('availableBlogs');

    blogs.forEach(blog => {
      const { shopifyId, handle: blogHandle } = blog;

      if (shopifyId === node.blog.id) {
        createNodeField({
          node,
          name: 'shopifyThemePath',
          value: `${basePath && `/${basePath}`}${blogPageBasePath &&
            `/${blogPageBasePath}`}/${blogHandle}${articlePageBasePath &&
            `/${articlePageBasePath}`}/${articleHandle}`,
        });
      }
    });
  }
};

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;

  let { cartPagePath = 'cart', basePath = '' } = options;

  basePath = removeTrailingLeadingSlashes(basePath);
  cartPagePath = removeTrailingLeadingSlashes(cartPagePath);
  const finalCartPagePath = `${basePath && `/${basePath}`}/${cartPagePath}`;

  createPage({
    path: finalCartPagePath,
    component: cartTemplate,
  });

  const mainPagePath = `${basePath && `/${basePath}`}/`;

  createPage({
    path: mainPagePath,
    component: mainPageTemplate,
    context: {
      handles: getMainPageHandles(gatsbyStorefrontConfig.mainPage),
    },
  });

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

  queryCollections.data.collections.nodes.forEach(
    ({ handle, products, fields }) => {
      let { shopifyThemePath } = fields;
      let collectionProductsCount = products.length;
      let productsPerPage = parseInt(productsPerCollectionPage);
      let numPages = Math.ceil(collectionProductsCount / productsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
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

            // Todo: Find a better way to do this.
            cartUrl: finalCartPagePath,
          },
        });
      });
    }
  );

  const queryProducts = await graphql(`
    {
      products: allShopifyProduct {
        nodes {
          handle
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `);
  queryProducts.data.products.nodes.forEach(({ handle, fields }) => {
    const { shopifyThemePath } = fields;
    createPage({
      path: shopifyThemePath,
      component: productTemplate,
      context: {
        handle,

        // Todo: Find a better way to do this.
        cartUrl: finalCartPagePath,
      },
    });
  });

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
  queryPolicies.data.policies.nodes.forEach(({ type, fields }) => {
    const { shopifyThemePath } = fields;
    createPage({
      path: shopifyThemePath,
      component: policyTemplate,
      context: {
        type,
        // Todo: Find a better way to do this.
        cartUrl: finalCartPagePath,
      },
    });
  });

  const queryPages = await graphql(`
    {
      pages: allShopifyPage {
        nodes {
          handle
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `);
  queryPages.data.pages.nodes.forEach(({ handle, fields }) => {
    const { shopifyThemePath } = fields;
    createPage({
      path: shopifyThemePath,
      component: pageTemplate,
      context: {
        handle,
        // Todo: Find a better way to do this.
        cartUrl: finalCartPagePath,
      },
    });
  });

  const queryArticles = await graphql(`
    {
      articles: allShopifyArticle {
        nodes {
          shopifyId
          fields {
            shopifyThemePath
          }
          blog {
            shopifyId
          }
        }
      }
    }
  `);

  queryArticles.data.articles.nodes.forEach(({ shopifyId, fields }) => {
    const { shopifyThemePath } = fields;
    createPage({
      path: shopifyThemePath,
      component: articleTemplate,
      context: {
        shopifyId,
        // Todo: Find a better way to do this.
        cartUrl: finalCartPagePath,
      },
    });
  });

  const queryBlogs = await graphql(`
    {
      blogs: allShopifyBlog {
        nodes {
          shopifyId
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `);

  queryBlogs.data.blogs.nodes.forEach(({ shopifyId, fields }) => {
    let { shopifyThemePath } = fields;
    let articlesArray = queryArticles.data.articles.nodes.filter(node => {
      return shopifyId === node.blog.shopifyId;
    });

    let articlesCount = articlesArray.length;
    let articlesPerPage = parseInt(articlesPerBlogPage);
    let numPages = Math.ceil(articlesCount / articlesPerPage);

    Array.from({
      length: numPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `${shopifyThemePath}` : `${shopifyThemePath}/${i + 1}`,
        component: blogTemplate,
        context: {
          shopifyId,
          shopifyThemePath,
          limit: articlesPerPage,
          skip: i * articlesPerPage,
          numPages,
          currentPage: i + 1,

          // Todo: Find a better way to do this.
          cartUrl: finalCartPagePath,
        },
      });
    });
  });
};
