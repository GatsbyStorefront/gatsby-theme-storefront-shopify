import React, { useState, useEffect } from 'react';
import { Flex, Box } from 'rebass';
import { Label, Select } from '@rebass/forms';
import equals from 'ramda/src/equals';

import { useCurrentVariantContext } from './CurrentVariantContext';

const ProductVariantSelector = (props) => {
  const { variants, options } = props;
  const { setCurrentVariant } = useCurrentVariantContext();
  const [userSelectedOptions, setUserSelectedOptions] = useState(() => {
    let initialState;
    options.forEach((option) => {
      initialState = { ...initialState, [option.name]: option.values[0] };
    });
    return initialState;
  });

  const showVariants =
    options.length > 0 &&
    !(
      options.length === 1 &&
      options[0].name === 'Title' &&
      options[0].values.length === 1 &&
      options[0].values[0] === 'Default Title'
    );

  const handleOptionsSelect = (name, value) => {
    setUserSelectedOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const getVariantFromSelectedOptions = (options, variants) => {
    let variantSelectedOptions;
    let availableForSale;
    let shopifyId = false;
    let price;
    let compareAtPrice;
    let sku;

    variants.forEach((v) => {
      v.selectedOptions.forEach((o) => {
        variantSelectedOptions = {
          ...variantSelectedOptions,
          [o.name]: o.value,
        };
      });
      if (equals(variantSelectedOptions, options)) {
        shopifyId = v.shopifyId;
        availableForSale = v.availableForSale;
        price = v.price;
        compareAtPrice = v.compareAtPrice;
        sku = v.sku;
      }
    });
    return { shopifyId, availableForSale, price, compareAtPrice, sku };
  };

  useEffect(() => {
    setCurrentVariant(
      getVariantFromSelectedOptions(userSelectedOptions, variants)
    );
  }, [userSelectedOptions, setCurrentVariant, variants]);

  return (
    <>
      {showVariants ? (
        <Flex {...props}>
          {options.map((option, index) => {
            return (
              /* 
              Width is set to 1/3
              - it looks better  
              - currently 3 is a max number of product options 
              */
              <Box width={1 / 3} mx={1} key={`box-${option.name}-${index}`}>
                <Label htmlFor={option.name}>{option.name}</Label>
                <Select
                  onChange={(event) => {
                    handleOptionsSelect(option.name, event.target.value);
                  }}
                  id={option.name}
                  name={option.name}
                  key={`select-${option.name}-${index}`}
                >
                  {option.values.map((value, index) => (
                    <option
                      key={`option-${option.name}-${index}`}
                      value={value}
                    >
                      {value}
                    </option>
                  ))}
                </Select>
              </Box>
            );
          })}
        </Flex>
      ) : (
        ''
      )}
    </>
  );
};

export default ProductVariantSelector;
