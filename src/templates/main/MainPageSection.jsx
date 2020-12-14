/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { Flex, Box } from 'rebass';

import MainPageCollectionBlock from './MainPageCollectionBlock';
import MainPageProductBlock from './MainPageProductBlock';

const MainPageSection = (props) => {
  const { section, data } = props;
  const sectionItemsNumber =
    section && section.children && section.children.length > 0
      ? section.children.length
      : 1;
  const sectionHeight = sectionItemsNumber < 3 ? '60vh' : '40vh';

  return (
    <Box maxWidth={1300} mx="auto">
      <Flex flexWrap="wrap" mx={2}>
        {section.children.map((block, index) => {
          if (
            block.type === 'collection' &&
            data.collections.nodes.filter(
              (collection) => collection.handle === block.handle
            )[0]
          ) {
            return (
              <Box
                width={[1, 1 / sectionItemsNumber]}
                key={index}
                height={['60vh', sectionHeight]}
                p={1}
                mb={[3, 0]}
              >
                <MainPageCollectionBlock
                  block={block}
                  collection={
                    data.collections.nodes.filter(
                      (collection) => collection.handle === block.handle
                    )[0]
                  }
                  textColor={block.textColor ? block.textColor : undefined}
                  textBgColor={
                    block.textBgColor ? block.textBgColor : undefined
                  }
                  buttonText={block.buttonText ? block.buttonText : undefined}
                  buttonTextColor={
                    block.buttonTextColor ? block.buttonTextColor : undefined
                  }
                  buttonBgColor={
                    block.buttonBgColor ? block.buttonBgColor : undefined
                  }
                  backgroundPosition="50% 0%"
                />
              </Box>
            );
          } else if (
            block.type === 'product' &&
            data.products.nodes.filter(
              (product) => product.handle === block.handle
            )[0]
          ) {
            return (
              <Box
                width={[1, 1 / sectionItemsNumber]}
                key={index}
                height={['60vh', sectionHeight]}
                p={1}
                mb={[3, 0]}
              >
                <MainPageProductBlock
                  block={block}
                  product={
                    data.products.nodes.filter(
                      (product) => product.handle === block.handle
                    )[0]
                  }
                  textColor={block.textColor ? block.textColor : undefined}
                  textBgColor={
                    block.textBgColor ? block.textBgColor : undefined
                  }
                  buttonText={block.buttonText ? block.buttonText : undefined}
                  buttonTextColor={
                    block.buttonTextColor ? block.buttonTextColor : undefined
                  }
                  buttonBgColor={
                    block.buttonBgColor ? block.buttonBgColor : undefined
                  }
                  backgroundPosition="50% 0%"
                />
              </Box>
            );
          } else {
            return '';
          }
        })}
      </Flex>
    </Box>
  );
};

export default MainPageSection;
