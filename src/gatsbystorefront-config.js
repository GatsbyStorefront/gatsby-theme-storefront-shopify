module.exports = {
  storeName: 'Gatsby Storefront',
  storeDescription: 'Demo store description',
  email: 'info@gatsbystorefront.com',
  company: 'Gatsby Storefront Inc.',
  location: 'New York, NY',
  address: '1 Centre St.',
  phone: '+1 (800) 123-1234',
  workingDays: 'Mon - Fri',
  workingHours: '8AM - 6PM',
  socialNetworks: [
    'https://facebook.com',
    'https://instagram.com',
    'https://pinterest.com',
    'https://twitter.com',
    'https://youtube.com',
  ],
  payments: ['visa', 'mastercard', 'amex', 'discover', 'shopify', 'paypal'],
  // For available socia share buttons see: https://github.com/nygardk/react-share
  shareButtons: [
    'Facebook',
    'Pinterest',
    'Twitter',
    'Tumblr',
    'Whatsapp',
    'Line',
    'Viber',
  ],
  googleAnalyticsId: 'UA-141525658-3',
  shopifyLite: true,
  //
  // carousel, collection, product
  //
  mainPage: [
    {
      type: 'carousel',
      children: [
        {
          name: 'Jewelery',
          type: 'collection',
          handle: 'jewelery',
        },
        {
          name: 'Apparel',
          type: 'collection',
          handle: 'apparel',
          textColor: 'white',
          textBgColor: 'primary',
        },
        {
          name: 'Silk Summer Top',
          type: 'product',
          handle: 'silk-summer-top',
          textColor: 'white',
          textBgColor: 'primary',
        },
      ],
    },
    {
      name: 'Apparel',
      type: 'collection',
      handle: 'apparel',
      textColor: 'white',
      textBgColor: 'primary',
    },
    {
      name: 'Garden',
      type: 'collection',
      handle: 'garden',
      textColor: 'white',
      textBgColor: 'primary',
    },
    {
      name: 'Test',
      type: 'collection',
      handle: 'test-collection',
    },
    {
      name: 'One product',
      type: 'product',
      handle: 'red-sports-tee',
    },
    {
      name: 'Anchor Bracelet Mens',
      type: 'product',
      handle: 'leather-anchor',
    },
    {
      name: 'Yellow Sofa',
      type: 'product',
      handle: 'yellow-sofa',
    },
    {
      name: '7 Shakra Bracelet',
      type: 'product',
      handle: 'chain-bracelet',
    },
    {
      name: 'White Cotton Shirt',
      type: 'product',
      handle: 'white-cotton-shirt',
      textColor: 'white',
      textBgColor: 'primary',
    },
  ],
  // Menu types: "header", "collection", "product", "link"
  menu: {
    name: 'Menu',
    type: 'top',
    children: [
      {
        name: "Women's",
        type: 'header',
        handle: '',
        link: '',
        children: [
          {
            name: 'Apparel',
            type: 'collection',
            handle: 'apparel',
          },
          {
            name: 'Jewelery',
            type: 'collection',
            handle: 'jewelery',
          },
          {
            name: 'One product',
            type: 'product',
            handle: 'red-sports-tee',
          },
        ],
      },
      {
        name: "Men's",
        type: 'header',
        children: [
          {
            name: 'Test',
            type: 'collection',
            handle: 'test-collection',
          },
          {
            name: 'Garden',
            type: 'collection',
            handle: 'garden',
          },
          {
            name: 'Apparel',
            type: 'collection',
            handle: 'apparel',
          },
          {
            name: 'External links',
            type: 'header',
            children: [
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 2',
                type: 'external',
                link: 'https://amazon.com',
              },
              {
                name: 'External link 3',
                type: 'external',
                link: 'https://amazon.com',
              },
            ],
          },
        ],
      },
      { name: 'Blog', type: 'blog', handle: 'news' },
    ],
  },
  footerLinks: [
    {
      name: 'About us',
      link: '/pages/about',
    },
    {
      name: 'Terms of Service',
      link: '/policy/termsOfService',
    },
    {
      name: 'Privacy policy',
      link: '/policy/privacyPolicy',
    },
    {
      name: 'Refunds',
      link: '/policy/refundPolicy',
    },
    {
      name: 'External',
      link: 'https://amazon.com',
    },
  ],
  locales: 'en-US',
  currency: 'USD',
  productsPerCollectionPage: '9',
  articlesPerBlogPage: '6',
};
