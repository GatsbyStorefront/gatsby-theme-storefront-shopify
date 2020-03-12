import React from 'react';
import { Flex, Box } from 'rebass';
import { useStaticQuery, graphql } from 'gatsby';

import MainPageCarousel from './MainPageCarousel';
import MainPageCollectionBlock from './MainPageCollectionBlock';
import MainPageProductBlock from './MainPageProductBlock';

const MainPage = props => {
  const dataQuery = useStaticQuery(graphql`
    query MainPageStaticQuery {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            mainPage {
              handle
              type
              name
              textBgColor
              textColor
              children {
                handle
                type
                name
                textBgColor
                textColor
              }
            }
          }
        }
      }
    }
  `);

  const { mainPage } = dataQuery.site.siteMetadata.gatsbyStorefrontConfig;

  const { data } = props;

  return (
    <Flex flexWrap="wrap" px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
      {mainPage.map((block, index) => {
        if (block.type === 'carousel') {
          return (
            <Box width={1} p={1} key={index}>
              <MainPageCarousel carousel={block} data={data} />
            </Box>
          );
        } else if (block.type === 'header') {
          return '';
        } else if (
          block.type === 'collection' &&
          data.collections.nodes.filter(
            collection => collection.handle === block.handle
          )[0]
        ) {
          return (
            <Box width={[1, 1 / 2]} p={1} key={index}>
              <MainPageCollectionBlock
                collection={
                  data.collections.nodes.filter(
                    collection => collection.handle === block.handle
                  )[0]
                }
                textColor={block.textColor}
                textBgColor={block.textBgColor}
              />
            </Box>
          );
        } else if (
          block.type === 'product' &&
          data.products.nodes.filter(
            product => product.handle === block.handle
          )[0]
        ) {
          return (
            <Box width={[1, 1 / 2]} p={1} key={index}>
              <MainPageProductBlock
                product={
                  data.products.nodes.filter(
                    product => product.handle === block.handle
                  )[0]
                }
                textColor={block.textColor}
                textBgColor={block.textBgColor}
              />
            </Box>
          );
        } else {
          return '';
        }
      })}
    </Flex>
  );
};

export default MainPage;
