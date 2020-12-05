import React from 'react';
import { Box } from 'rebass';
import { useStaticQuery, graphql } from 'gatsby';

import MainPageCarousel from './MainPageCarousel';
import MainPageSection from './MainPageSection';
import MainPageFeaturedCollectionBlock from './MainPageFeaturedCollectionBlock';

const MainPage = (props) => {
  const dataQuery = useStaticQuery(graphql`
    query MainPageStaticQuery {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            mainPage {
              handle
              type
              name
              description
              limit
              isExpanded
              textBgColor
              textColor
              buttonText
              buttonTextColor
              buttonBgColor
              children {
                handle
                type
                name
                description
                limit
                isExpanded
                textBgColor
                textColor
                buttonText
                buttonTextColor
                buttonBgColor
              }
            }
          }
        }
      }
    }
  `);

  const { mainPage } = dataQuery.site.siteMetadata.gatsbyStorefrontConfig;

  const { data } = props;

  const { cartUrl } = props.pageContext;

  return (
    <Box px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
      {mainPage.map((block, index) => {
        if (block.type === 'carousel') {
          return (
            <Box width={1} mb={1} key={index}>
              <MainPageCarousel carousel={block} data={data} />
            </Box>
          );
        } else if (block.type === 'section') {
          return (
            <Box width={1} mb={1} key={index}>
              <MainPageSection section={block} data={data} />
            </Box>
          );
        } else if (
          block.type === 'product' ||
          (block.type === 'collection' && block.isExpanded === false)
        ) {
          return (
            <Box width={1} mb={1} key={index}>
              <MainPageSection section={{ children: [block] }} data={data} />
            </Box>
          );
        } else if (block.type === 'collection' && block.isExpanded == true) {
          let products = [];
          props.data.feautiredCollections.nodes.forEach((node) => {
            if (node.handle === block.handle) {
              products = [...products, ...node.products];
            }
          });
          return (
            <MainPageFeaturedCollectionBlock
              block={block}
              products={products}
              cartUrl={cartUrl}
              key={index}
            />
          );
        } else if (block.type === 'header') {
          return '';
        } else {
          return '';
        }
      })}
    </Box>
  );
};

export default MainPage;
