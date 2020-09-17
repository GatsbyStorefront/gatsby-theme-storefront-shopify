import React from 'react';
import { Flex } from 'rebass';

import ProductDescriptionSection from './ProductDescriptionSection';
import Divider from '../../components/Divider';

const ProductDescriptionSections = ({ sections }) => {
  return (
    <Flex flexDirection="column">
      {sections.map((s, i) => {
        if (s) {
          const { title, isOpen } = s.options;
          const { section: body } = s;
          return (
            <>
              <ProductDescriptionSection
                title={title}
                body={body}
                isOpen={isOpen}
                key={i}
              />
              {sections.length - 1 !== i ? <Divider /> : ''}
            </>
          );
        } else {
          return '';
        }
      })}
    </Flex>
  );
};

export default ProductDescriptionSections;
