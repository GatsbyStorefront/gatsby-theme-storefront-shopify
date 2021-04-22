/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Text } from 'theme-ui';
import { Link as GatsbyLink, navigate } from 'gatsby';
import { useShopifyFunctions } from '../../hooks/useShopifyFunctions';

const AddToCart = (props) => {
  const { addItem } = useShopifyFunctions();
  const { title, shopifyId, amount, cartUrl, isSelectOptions = false } = props;

  const addToCartHandler = async (shopifyId, amount, cartUrl) => {
    addItem({ variantId: shopifyId, quantity: amount })
      .then(
        (res) => {
          navigate(cartUrl);
        },
        (rej) => {
          console.error(rej);
        }
      )
      .catch((error) => {
        throw new Error(error);
      });
  };

  return !isSelectOptions ? (
    <Text
      onClick={() => {
        addToCartHandler(shopifyId, amount, cartUrl);
      }}
      {...props}
    >
      {title}
    </Text>
  ) : (
    <Text as={GatsbyLink} {...props}>
      {title}
    </Text>
  );
};

export default AddToCart;
