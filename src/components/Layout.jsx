import React from 'react';
import { ThemeProvider, Styled } from 'theme-ui';
import Helmet from 'react-helmet';
import { Flex, Box } from 'rebass';
import ReactGA from 'react-ga';
import { useStaticQuery, graphql } from 'gatsby';

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
      query {
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
    <ThemeProvider theme={theme}>
      <Styled.root>
        <LayoutComponents children={children} />
      </Styled.root>
    </ThemeProvider>
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

      <Flex flexDirection="column" style={{ minHeight: '100vh' }}>
        <MenuContextProvider>
          <SearchContextProvider>
            <Navbar />
          </SearchContextProvider>
        </MenuContextProvider>

        <Box
          as="main"
          flex="1"
          width={1}
          style={{ maxWidth: 1300, height: '100%' }}
          mx="auto"
          mt={['35px', '60px']}
        >
          {children}
        </Box>

        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
