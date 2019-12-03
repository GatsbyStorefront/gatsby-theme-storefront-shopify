import React from 'react';
import { ThemeProvider, Styled } from 'theme-ui';
import Helmet from 'react-helmet';
import { Flex, Box } from 'rebass';
import ReactGA from 'react-ga';

import {
  MenuContextProvider,
  useMenuContext,
} from '../components/Menu/context';

import {
  SearchContextProvider,
  useSearchContext,
} from '../components/Search/context';
import Navbar from './Navbar';
import Footer from './Footer';
import theme from '../gatsby-plugin-theme-ui/index';
import { googleAnalyticsId } from '../../gatsbystorefront-config';

import './reset.css';

const initializeReactGA = () => {
  ReactGA.initialize(googleAnalyticsId);
  if (typeof window !== `undefined`) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

const Layout = ({ children }) => {
  initializeReactGA();
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <MenuContextProvider>
          <SearchContextProvider>
            <LayoutComponents children={children} />
          </SearchContextProvider>
        </MenuContextProvider>
      </Styled.root>
    </ThemeProvider>
  );
};

const LayoutComponents = ({ children }) => {
  const { menuShowed } = useMenuContext();
  const { searchShowed } = useSearchContext();
  return (
    <Box
      sx={{
        position: menuShowed || searchShowed ? 'fixed' : 'relative',
        overflow: menuShowed || searchShowed ? 'hidden' : 'visible',
        width: '100%',
      }}
    >
      <Helmet>
        <html lang="en" />
      </Helmet>

      <Flex flexDirection="column" style={{ minHeight: '100vh' }}>
        <Navbar />
        <Box
          as="main"
          flex="1"
          width={1}
          style={{ maxWidth: 1300, height: '100%' }}
          mx="auto"
          mt={['40px', '80px']}
        >
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
