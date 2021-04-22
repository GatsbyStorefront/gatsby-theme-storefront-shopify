/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import Helmet from 'react-helmet';
import { Flex, Box } from 'theme-ui';
import ReactGA from 'react-ga';
import { useStaticQuery, graphql } from 'gatsby';

import { ShopifyFunctionsContextProvider } from '../hooks/useShopifyFunctions.js';
import { MenuContextProvider } from './Menu/context';

import { SearchContextProvider } from './Search/context';
import Navbar from './Navbar';
import Footer from './Footer';
import theme from '../gatsby-plugin-theme-ui/index';

import './reset.css';

const initializeReactGA = (googleAnalyticsId) => {
  if (googleAnalyticsId) {
    ReactGA.initialize(googleAnalyticsId);
    if (typeof window !== `undefined`) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }
};

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            gatsbyStorefrontConfig {
              googleAnalyticsId
            }
          }
        }
      }
    `
  );

  const { googleAnalyticsId } = data.site.siteMetadata.gatsbyStorefrontConfig;

  initializeReactGA(googleAnalyticsId);

  return (
    <ShopifyFunctionsContextProvider>
      <LayoutComponents children={children} />
    </ShopifyFunctionsContextProvider>
  );
};

const LayoutComponents = ({ children }) => {
  return (
    <Box
      bg="background"
      sx={{
        width: '100%',
      }}
    >
      <Helmet>
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" hrfe="https://cdn.shopify.com" />
      </Helmet>

      <Flex sx={{ minHeight: '100vh', flexDirection: 'column' }}>
        <MenuContextProvider>
          <SearchContextProvider>
            <Navbar />
          </SearchContextProvider>
        </MenuContextProvider>

        <Box
          as="main"
          sx={{
            flex: '1',
            maxWidth: 1300,
            width: '100%',
            height: '100%',
            mx: 'auto',
            mt: ['35px', '60px'],
          }}
        >
          {children}
        </Box>

        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
