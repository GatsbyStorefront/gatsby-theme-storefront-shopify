import React from 'react';
import { Flex, Box } from 'rebass';

import ProductDescriptionSection from './ProductDescriptionSection';
import Divider from '../../components/Divider';

const ProductDescriptionSections = ({ sections }) => {
  return (
    <Flex flexDirection="column">
      {sections.map((s, i) => {
        if (s) {
          const { title, contentHtml, isOpen } = s;
          return (
            <Box key={i}>
              <ProductDescriptionSection
                title={title}
                contentHtml={contentHtml}
                isOpen={isOpen}
              />
              {sections.length - 1 !== i ? <Divider /> : ''}
            </Box>
          );
        } else {
          return '';
        }
      })}
    </Flex>
  );
};

export default ProductDescriptionSections;
