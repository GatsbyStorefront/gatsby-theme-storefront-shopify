<p align="center">
<img alt="Logo" src="https://gatsbystorefront-static.now.sh/gatsbystorefront_readme_logo.png"/>
</p>

# Gatby Storefront – lightning fast PWA storefront for Shopify

Gatby Storefront is a headless eCommerce PWA storefront for Shopify. Powered by GatsbyJS it brings eCommerce to the edge for lightning fast webstore performance.

![GitHub package.json version](https://img.shields.io/github/package-json/v/gatsbystorefront/gatsby-theme-storefront-shopify)
![GitHub](https://img.shields.io/github/license/gatsbystorefront/gatsby-theme-storefront-shopify?color=green)
[![Join the community on Spectrum](https://img.shields.io/badge/join%20the%20community-on%20spectrum-blue.svg?style=flat-square&colorB=3818E5)](https://spectrum.chat/GatsbyStorefront)

Please <a href="https://demo.gatsbystorefront.com" >see our demo here</a>. And if you like it please give us a star on GitHub ⭐ 👍 😀

<!-- toc -->

- [Demo](#demo)
- [Setup guide](#setup-guide)
  - [Install CLI](#install-cli)
  - [Create store site](#create-store-site)
  - [Install Gatsby Storefront](#install-gatsby-storefront)
  - [Create `.env` file](#create-env-file)
  - [Enable theme](#enable-theme)
  - [Shopify content requirement](#shopify-content-requirement)
  - [Starter](#starter)
- [Configuration](#configuration)
  - [Configuration file](#configuration-file)
  - [Theme shadowing](#theme-shadowing)
  - [Development](#development)
  - [Build](#build)
  - [Serve](#serve)
  - [Publish](#publish)

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
GATSBY_SHOP_NAME=your_shopify_store_name
GATSBY_SHOPIFY_ACCESS_TOKEN=your_shopify_access_token
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
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        basePath: '/',
        shopifyLite: ; false,
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

Please make sure that your Shopify web store has at least one [Collection](https://help.shopify.com/en/manual/products/collections), one [Product](https://help.shopify.com/en/manual/products/add-update-products) (associated with Collection), [Blog post](https://help.shopify.com/en/manual/sell-online/online-store/blogs/writing-blogs), [Page](https://help.shopify.com/en/manual/sell-online/online-store/pages) and [store Policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos) added before runing your Gatsby Storefront, as it is neccesary for correct API exposure.

### A setup for Shopify Lite plan

If you are using Shopify Lite plan. Please set `shopifyLite` property to `true` in `@gatsbystorefront/gatsby-theme-storefront-shopify` plugin `options` in `gatsby-config.js`. This will disable generation of pages for Blog and Pages as they are not avalible in "Lite" plan.

### Starter

You can also use the starter package for fatster setup process.

```sh
gatsby new store gatsbystorefront/gatsby-starter-storefront-shopify
```

This downloads the files and initializes the site by running npm install.

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

![Expolore Gatsby Storefront](https://octodex.github.com/images/scubatocat.png)
