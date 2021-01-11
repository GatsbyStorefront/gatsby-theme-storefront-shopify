import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyLink from 'gatsby-link';
import { Index } from 'elasticlunr';
import { Flex, Box, Text } from 'rebass';
import { Input } from '@rebass/forms';
import styled from '@emotion/styled';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { useSearchContext } from './context';
import SearchIcon from '../Icons/SearchIcon';
import Close from '../Icons/Close';
import strings from './strings.json';

const { searchLabel, searchInputLabel } = strings;

const Sidebar = styled(Box)`
  position: fixed;
  overflow: auto;
  z-index: 99;
  top: 0;
  right: 0;
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

const SearchItem = styled(Box)`
  &: hover {
    opacity: 0.4;
    background: #eee;
  }
`;

const Search = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showSidebar, setShowsidebar] = useState(false);
  const { searchShowed, setSearchShowed } = useSearchContext();
  let index;

  const getOrCreateIndex = () =>
    index || Index.load(data.siteSearchIndex.index);

  const search = (evt) => {
    const query = evt.target.value;
    index = getOrCreateIndex();
    setQuery(query);
    setResults(
      index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => index.documentStore.getDoc(ref))
    );
  };

  const toggleSidebar = () => {
    setShowsidebar(!showSidebar);
    setSearchShowed(!searchShowed);
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
      <SearchIcon
        width="24px"
        height="24px"
        onClick={toggleSidebar}
        sx={{ cursor: 'pointer' }}
      />
      <Box ref={sidebarRef}>
        {showSidebar ? (
          <>
            <Sidebar width={[1, 1 / 3, 1 / 4]} sx={{ bg: 'white' }}>
              <Flex flexDirection="column" m={[1, 2]}>
                <Flex
                  onClick={toggleSidebar}
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  width={1}
                >
                  <Box>{searchLabel}</Box>
                  <Box ml="auto">
                    <Close
                      width="20px"
                      height="20px"
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                </Flex>
                <Box>
                  <Input
                    id="search"
                    type="text"
                    value={query}
                    onChange={search}
                    placeholder={searchInputLabel}
                  />
                </Box>
                <Box>
                  {results.map((page) => (
                    <SearchItem key={page.id} m={2}>
                      <Text
                        as={GatsbyLink}
                        variant="searchLink"
                        to={page.shopifyThemePath}
                        onClick={toggleSidebar}
                      >
                        <Box>{page.title}</Box>
                      </Text>
                    </SearchItem>
                  ))}
                </Box>
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

export default Search;
