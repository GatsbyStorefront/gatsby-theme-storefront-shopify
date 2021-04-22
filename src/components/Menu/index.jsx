/** @jsx jsx */
import { jsx } from 'theme-ui';

import React, { useState, useEffect, useRef } from 'react';
import { Flex, Box, Link } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { useMenuContext } from './context';
import ChevronLeft from '../Icons/ChevronLeft';
import Burger from '../Icons/Burger';
import Close from '../Icons/Close';

const Sidebar = styled(Box)`
  position: fixed;
  overflow: auto;
  z-index: 99;
  top: 0;
  left: 0;
  height: 100%;
`;

const DisabledArea = styled(Box)`
  position: fixed;
  z-index: 98;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  overflow: 'hidden';
`;

const MenuItem = styled(Box)`
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 1px;
  &: hover {
    opacity: 0.4;
  }
`;

const Menu = ({ menu: componentMenu }) => {
  const [parentId, setParentId] = useState(0);
  const [showSidebar, setShowsidebar] = useState(false);
  const { menuShowed, setMenuShowed } = useMenuContext();

  const updateParentId = (id) => {
    setParentId(id);
  };

  const toggleSidebar = () => {
    setShowsidebar(!showSidebar);
    setMenuShowed(!menuShowed);
  };

  const sidebarRef = useRef();

  useEffect(() => {
    if (showSidebar) {
      disableBodyScroll(sidebarRef.current);
    } else {
      enableBodyScroll(sidebarRef.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [showSidebar]);

  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={toggleSidebar}>
        <Burger width="20px" height="20px" />
      </Box>

      <Box ref={sidebarRef}>
        {showSidebar ? (
          <>
            <Sidebar
              sx={{
                bg: 'menu',
                width: ['100%', 100 / 3 + '%', 100 / 4 + '%', 100 / 5 + '%'],
              }}
            >
              <Flex bg="menuItem" color="menuText" p={[2]} sx={{ fontSize: 4 }}>
                <Box mr={3} sx={{ width: '50%' }}>
                  {componentMenu && parentId > 0
                    ? componentMenu.map((element) => {
                        if (element.id === parentId) {
                          return (
                            <Box
                              onClick={() => {
                                updateParentId(element.parentId);
                              }}
                              sx={{ cursor: 'pointer' }}
                            >
                              <ChevronLeft
                                width="25px"
                                height="25px"
                                key={element.id}
                              />
                            </Box>
                          );
                        } else {
                          return '';
                        }
                      })
                    : ''}
                </Box>
                <Flex
                  onClick={toggleSidebar}
                  sx={{
                    width: '50%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                  }}
                >
                  <Close width="25px" height="25px" color="menuText" />
                </Flex>
              </Flex>

              <Flex sx={{ flexDirection: 'column' }}>
                {componentMenu
                  ? componentMenu.map((element) => {
                      if (element.parentId === parentId) {
                        return (
                          <React.Fragment key={element.id}>
                            {element.type === 'header' ? (
                              <MenuItem
                                sx={{ cursor: 'pointer', fontSize: 4 }}
                                bg="menuItem"
                                color="menuText"
                                onClick={() => {
                                  updateParentId(element.id);
                                }}
                                key={element.id}
                              >
                                {element.name}
                              </MenuItem>
                            ) : (
                              ''
                            )}
                            {element.type !== 'header' &&
                            element.type !== 'external' ? (
                              <Link
                                as={GatsbyLink}
                                to={`/${element.type}/${element.handle}`}
                                key={element.id}
                                sx={{ textDecoration: 'none' }}
                                onClick={toggleSidebar}
                              >
                                <MenuItem
                                  bg="menuItem"
                                  color="menuText"
                                  sx={{ fontSize: 4 }}
                                >
                                  {element.name}
                                </MenuItem>
                              </Link>
                            ) : (
                              ''
                            )}
                            {element.type === 'external' ? (
                              <a
                                href={element.link}
                                key={element.id}
                                style={{ textDecoration: 'none' }}
                              >
                                <MenuItem
                                  bg="menuItem"
                                  color="menuText"
                                  sx={{ fontSize: [3, 4] }}
                                >
                                  {element.name}
                                </MenuItem>
                              </a>
                            ) : (
                              ''
                            )}
                          </React.Fragment>
                        );
                      } else {
                        return '';
                      }
                    })
                  : ''}
              </Flex>
            </Sidebar>

            <DisabledArea onClick={toggleSidebar} />
          </>
        ) : (
          ''
        )}
      </Box>
    </>
  );
};

export default Menu;
