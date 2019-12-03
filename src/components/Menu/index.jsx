import React, { useState } from 'react';
import { Flex, Box } from 'rebass';
import GatsbyLink from 'gatsby-link';
import * as R from 'ramda';
import styled from '@emotion/styled';

import { useMenuContext } from './context';
import ChevronLeft from '../Icons/ChevronLeft/';
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

const prepareMenu = menu => {
  let flattenMenu = [];
  let id = 0;

  const children = R.prop('children');
  const dissoc = R.dissoc('children');
  const assocId = R.assoc('id');
  const assocParentId = R.assoc('parentId');

  const iterate = (childrenArray, parentId = 0) => {
    childrenArray.forEach((obj, index) => {
      id++;
      flattenMenu = R.concat(flattenMenu, [
        dissoc(assocId(id, assocParentId(parentId, obj))),
      ]);

      if (children(obj)) {
        iterate(children(obj), id);
      }
    });
  };

  iterate(menu.children);
  return flattenMenu;
};

const Menu = ({ menu }) => {
  const [componentMenu, setComponentMenu] = useState(prepareMenu({ ...menu }));
  const [parentId, setParentId] = useState(0);
  const [showSidebar, setShowsidebar] = useState(false);
  const { menuShowed, setMenuShowed } = useMenuContext();

  const updateParentId = id => {
    setParentId(id);
  };

  const toggleSidebar = () => {
    setShowsidebar(!showSidebar);
    setMenuShowed(!menuShowed);
  };

  return (
    <React.Fragment>
      <Burger
        width="20px"
        height="20px"
        onClick={toggleSidebar}
        sx={{ cursor: 'pointer' }}
      />
      {showSidebar ? (
        <React.Fragment>
          <Sidebar width={[1, 1 / 3, 1 / 4, 1 / 5]} sx={{ bg: 'menu' }}>
            <Flex bg="menuItem" color="menuText" p={[2]} fontSize={[4]}>
              <Box mr={3} width={1 / 2}>
                {componentMenu && parentId > 0
                  ? componentMenu.map(element => {
                      if (element.id === parentId) {
                        return (
                          <ChevronLeft
                            width="25px"
                            height="25px"
                            onClick={() => {
                              updateParentId(element.parentId);
                            }}
                            sx={{ cursor: 'pointer' }}
                            key={element.id}
                          />
                        );
                      }
                    })
                  : ''}
              </Box>
              <Flex
                onClick={toggleSidebar}
                width={1 / 2}
                justifyContent="flex-end"
              >
                <Close
                  width="25px"
                  height="25px"
                  color="menuText"
                  sx={{ cursor: 'pointer' }}
                />
              </Flex>
            </Flex>

            <Flex flexDirection="column">
              {componentMenu
                ? componentMenu.map(element => {
                    if (element.parentId === parentId) {
                      return (
                        <React.Fragment key={element.id}>
                          {element.type === 'header' ? (
                            <MenuItem
                              sx={{ cursor: 'pointer' }}
                              bg="menuItem"
                              color="menuText"
                              onClick={() => {
                                updateParentId(element.id);
                              }}
                              fontSize={[4]}
                              key={element.id}
                            >
                              {element.name}
                            </MenuItem>
                          ) : (
                            ''
                          )}
                          {element.type !== 'header' &&
                          element.type !== 'external' ? (
                            <GatsbyLink
                              to={'/' + element.type + '/' + element.handle}
                              key={element.id}
                              style={{ textDecoration: 'none' }}
                            >
                              <MenuItem
                                bg="menuItem"
                                color="menuText"
                                fontSize={[4]}
                              >
                                {element.name}
                              </MenuItem>
                            </GatsbyLink>
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
                                fontSize={[3, 4]}
                              >
                                {element.name}
                              </MenuItem>
                            </a>
                          ) : (
                            ''
                          )}
                        </React.Fragment>
                      );
                    }
                  })
                : ''}
            </Flex>
          </Sidebar>

          <DisabledArea onClick={toggleSidebar} />
        </React.Fragment>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default Menu;
