<p align="center">
<img alt="Logo" src="https://gatsbystorefront-static.now.sh/gatsbystorefront_readme_logo.png"/>
</p>

# Create a Shopify store with Gatsby JS

Gatsby JS theme to create a Shopify headless eCommerce PWA store.

![GitHub package.json version](https://img.shields.io/github/package-json/v/gatsbystorefront/gatsby-theme-storefront-shopify)
![GitHub](https://img.shields.io/github/license/gatsbystorefront/gatsby-theme-storefront-shopify?color=green)

Please see our <a href="https://demo.gatsbystorefront.com" >demo</a>, <a href="https://youtu.be/B7CXzx9jQeM">speed test video</a> and <a href="https://gatsbystorefront.com">create a Gatsby JS based Shopify store</a> with us.

If you like Gatsby Storefront **please give us a star on GitHub** ⭐ 👍 😀

<!-- toc -->

- [Demo](#demo)
- [How fast is Gatsby Storefront?](#how-fast-is-gatsby-storefront)
- [Starter](#starter)
- [Setup guide](#setup-guide)
  - [Install CLI](#install-cli)
  - [Create store site](#create-store-site)
  - [Install Gatsby Storefront](#install-gatsby-storefront)
  - [Create `.env` file](#create-env-file)
  - [Enable theme](#enable-theme)
  - [Shopify content requirement](#shopify-content-requirement)
- [Configuration](#configuration)
  - [Configuration file](#configuration-file)
  - [Theme shadowing](#theme-shadowing)
  - [Development](#development)
  - [Build](#build)
  - [Serve](#serve)
  - [Publish](#publish)
- [Thank you!](#thank-you)
- [Contributors ✨](#contributors)

## Demo

<p align="center">
  <img width="640" src="https://gatsbystorefront-static.now.sh/gatsbystorefront-demogif-low.webp">
</p>

<p align="center">
  Exceptional Lighthouse audit results:
  <br/>

  <img width="584" src="https://gatsbystorefront-static.now.sh/gatsbystorefront-lighthouse-test-low.gif">
</p>

Please, see the demo here: [https://demo.gatsbystorefront.com](https://demo.gatsbystorefront.com/).

## How fast is Gatsby Storefront?

Please, see our speed test video: [https://youtu.be/B7CXzx9jQeM](https://youtu.be/B7CXzx9jQeM).

[<img src="https://img.youtube.com/vi/B7CXzx9jQeM/maxresdefault.jpg" width="50%">](https://youtu.be/B7CXzx9jQeM)

The tests are made with [puppeteer](https://github.com/puppeteer/puppeteer) based test script that emulates a customer journey and counts time necessary to load the pages: [https://github.com/GatsbyStorefront/speedtests](https://github.com/GatsbyStorefront/speedtests).

## Starter

You can use the starter package for fatster setup process.

```sh
gatsby new store gatsbystorefront/gatsby-starter-storefront-shopify
```

This downloads the files and initializes the site by running npm install.

## Setup guide

### Install CLI

Install the Gatsby CLI:

```
npm install -g gatsby-cli
```

### Create store site

Create new gatsby site for your web store:

```sh
gatsby new store
```

### Install Gatsby Storefront

Install Gatsby Storefront NPM package:

```sh
npm install @gatsbystorefront/gatsby-theme-storefront-shopify
```

### Create `.env` file

Create `.env` file in your store's root directory with your Shopify storename (**storename**.myshopify.com) and [access token](https://help.shopify.com/en/api/getting-started/authentication/private-authentication#generate-credentials-from-the-shopify-admin) (your token must have full permissions on Storefront API).

```
GATSBY_SHOPIFY_SHOP_NAME=your_shopify_store_name
GATSBY_SHOPIFY_ACCESS_TOKEN=your_shopify_access_token
```

In case you are using Gatsby Storefront API to enable connections with external data sources (Contentful, Yotpo), please add additional configuration variables to your `.env` file:

```
GATSBYSTOREFRONT_API_URL=your_api_url.gatsbystorefront.com
GATSBYSTOREFRONT_ACCESS_TOKEN=your_gatsbystorefrontApi_access_token
```

### Enable theme

Enable `gatsbystorefront/gatsby-theme-storefront-shopify` plugin in your `gatsby-config.js`:

```js
require("dotenv").config({ path: `.env` })
const flattenMenu = require("@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/flattenMenu")

module.exports = {
  plugins: [
    {
      resolve: '@gatsbystorefront/gatsby-theme-storefront-shopify',
      options: {
        shopify: {
          shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
          accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        },
        gatsbyStorefrontApi: {
          apiUrl: process.env.GATSBYSTOREFRONT_API_URL,
          accessToken: process.env.GATSBYSTOREFRONT_ACCESS_TOKEN,
        },
        useGatsbyStorefrontApi: false, // Set to 'true' in case you are using Gatsby Storefront API to enable connections with external data sources
        basePath: '/',
        productImagesCarouselProps: {
          // See: https://github.com/express-labs/pure-react-carousel#carouselprovider-
          naturalSlideWidth: 500,
          naturalSlideHeight: 500,
        },
        product: {
          maxDescriptionSectionsNumber: 10,
        },
        manifest: { // web app manifest options to be passed to 'gatsby-plugin-manifest' installed inside theme
          name: 'Gatsby Storefront Demo Store',
          short_name: 'Gatsby Storefront',
          start_url: '/',
          background_color: '#fff',
          theme_color: '#333',
          display: 'standalone',
          icon: 'src/images/shopping_bag.svg',
          icon_options: {
            purpose: 'any maskable',
          },
          cache_busting_mode: 'none',
        },
      },
    },
  ],
  siteMetadata: {
    siteUrl: 'https://demo.gatsbystorefront.com',
    gatsbyStorefrontConfig: {
      // Your Gatsby Storefront configuration
      // Copy exmaple from the starter:
      // https://github.com/GatsbyStorefront/gatsby-starter-storefront-shopify/blob/master/gatsby-config.js

    }
};
```

### Shopify content requirement

Please make sure that your Shopify web store has at least one [Collection](https://help.shopify.com/en/manual/products/collections), one [Product](https://help.shopify.com/en/manual/products/add-update-products) (associated with Collection) and [store Policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos) added before runing your Gatsby Storefront, as it is neccesary for correct API exposure.

## Configuration

### Configuration file

Main theme configuration options are located in `gatsbyStorefrontConfig` object in `gatsby-config.js` file. Use it to:

- Configure main store parameters.
- Set up main menu and footer links.

### Theme shadowing

- Use [shadowing](https://www.gatsbyjs.org/docs/themes/shadowing/) for making necessary changes in `@gatsbystorefront/gatsby-theme-storefront-shopify` theme.
- Use shadowing of `@gatsbystorefront/gatsby-theme-storefront-shopify/src/gatsby-plugin-theme-ui/index.js` to change theme colors in accordance with [theme-ui specification](https://theme-ui.com/theme-spec).

For code example please see our [shadowing exmaple repo](https://github.com/GatsbyStorefront/theme-shadowing-example).

Note: In order to work in shadowed components GrapshQL queries have to be renamed.

### Development

```sh
gatsby develop
```

Will start a hot-reloading development environment accessible by default at localhost:8000.

### Build

```sh
gatsby build
```

Will perform an optimized production build for your site, generating static HTML and per-route JavaScript code bundles.

### Serve

```sh
gatsby serve
```

Starts a local HTML server for testing your built site. Remember to build your site using `gatsby build` before using this command.

### Publish

After making a build, upload `public/` directory to your web host. See additional instructions [here](https://www.gatsbyjs.org/docs/deploying-and-hosting/).

## Thank you!

Thank you! And we would love to hear your [feedback [😍😜😮😐😤]](https://pavel905961.typeform.com/to/Iv44IK).

![Expolore Gatsby Storefront](https://octodex.github.com/images/pusheencat.png)

## Contributors

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://pavelivanov.net"><img src="https://avatars3.githubusercontent.com/u/202422?v=4" width="100px;" alt=""/><br /><sub><b>Pavel</b></sub></a><br /><a href="https://github.com/GatsbyStorefront/gatsby-theme-storefront-shopify/commits?author=paveli" title="Code">💻</a> <a href="#design-paveli" title="Design">🎨</a> <a href="https://github.com/GatsbyStorefront/gatsby-theme-storefront-shopify/commits?author=paveli" title="Documentation">📖</a> <a href="#example-paveli" title="Examples">💡</a> <a href="#ideas-paveli" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-paveli" title="Project Management">📆</a> <a href="https://github.com/GatsbyStorefront/gatsby-theme-storefront-shopify/pulls?q=is%3Apr+reviewed-by%3Apaveli" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/mimibar"><img src="https://avatars2.githubusercontent.com/u/2718783?v=4" width="100px;" alt=""/><br /><sub><b>mimibar</b></sub></a><br /><a href="https://github.com/GatsbyStorefront/gatsby-theme-storefront-shopify/issues?q=author%3Amimibar" title="Bug reports">🐛</a> <a href="https://github.com/GatsbyStorefront/gatsby-theme-storefront-shopify/commits?author=mimibar" title="Code">💻</a></td>
    <td align="center"><a href="https://checkpointlive.com"><img src="https://avatars3.githubusercontent.com/u/22243890?v=4" width="100px;" alt=""/><br /><sub><b>Adam Chilton</b></sub></a><br /><a href="https://github.com/GatsbyStorefront/gatsby-theme-storefront-shopify/issues?q=author%3AARChilton" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
