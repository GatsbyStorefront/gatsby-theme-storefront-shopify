import React, { useState } from 'react';
import { Flex, Text, Box } from 'rebass';
import GatsbyLink from 'gatsby-link';
import styled from '@emotion/styled';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import Menu from '../components/Menu';
import Search from '../components/Search';
import ShoppingBag from '../components/Icons/ShoppingBag';
import ShoppingCart from '../components/Icons/ShoppingCart';
import config from '../../gatsbystorefront-config';
import strings from './strings.json';

const { ariaShoppingCartLabel, ariaHomaPageLinkLabel } = strings;

const NavbarBase = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
`;

const Nav = styled(NavbarBase)`
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2);
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 200ms ${props => (props.show ? 'ease-in' : 'ease-out')};
  transform: ${props => (props.show ? 'none' : 'translate(0, -100%)')};
`;

const Navbar = props => {
  const [hideNavbarOnScroll, setHideNavbarOnScroll] = useState(true);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      // Note: prevPos.y > -12 is here to fix Nav component disappearing bug
      // due to elastic scrolling/bounce effect in mobile Safari.
      const isShow = currPos.y > prevPos.y || prevPos.y > -12;
      if (isShow !== hideNavbarOnScroll) setHideNavbarOnScroll(isShow);
    },
    [hideNavbarOnScroll],
    null,
    false,
    100
  );

  return (
    <Nav show={hideNavbarOnScroll}>
      <Box py={3} width={1} as="nav" bg="white">
        <Flex
          style={{ maxWidth: 1300 }}
          justifyContent="center"
          alignItems="center"
          mx="auto"
          px={[3, null, 4]}
        >
          <Box width={100}>
            <Menu menu={config.menu} />
          </Box>

          <Text
            as={GatsbyLink}
            to="/"
            aria-label={ariaHomaPageLinkLabel}
            style={{ textDecoration: 'none' }}
            ml="auto"
          >
            <ShoppingBag
              m="auto"
              width={['25px', '30px']}
              height={['25px', '30px']}
              color="secondary"
            />
            <Text
              color="primary"
              fontSize={[2, 3]}
              sx={{ display: ['none', 'block'] }}
            >
              {config.storeName}
            </Text>
          </Text>

          <Flex ml="auto" width={100}>
            <Box ml="auto">
              <Search width="25px" height="25px" color="primary" />
            </Box>

            <Text
              as={GatsbyLink}
              aria-label={ariaShoppingCartLabel}
              to="/cart"
              fontSize={4}
              style={{ textDecoration: 'none' }}
              ml="auto"
            >
              <ShoppingCart width="25px" height="25px" color="primary" />
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Nav>
  );
};

export default Navbar;
