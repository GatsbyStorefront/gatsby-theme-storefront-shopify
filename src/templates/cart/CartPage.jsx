import React from 'react';
import { Flex, Box, Button, Heading, Text } from 'rebass';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';

import strings from './strings.json';
import Divider from '../../components/Divider';
import formatPrice from '../../utils/formatPrice';
import useShopifyFunctions from '../../hooks/useShopifyFunctions';
import LineItem from './LineItem';

const { cartSubtotalLabel, cartCheckoutButton, cartHeader } = strings;

const CheckoutButton = styled(Button)(({ theme }) => ({
  fontFamily: theme.fonts.sans,
}));

function CartPage() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            locales
            currency
          }
        }
      }
    }
  `);
  const { locales, currency } = data.site.siteMetadata.gatsbyStorefrontConfig;

  const { checkout, updateItem, removeItem } = useShopifyFunctions();
  const { subtotalPrice, webUrl } = checkout;

  const displaySubtotalPrice = formatPrice(
    Number(subtotalPrice),
    locales,
    currency
  );

  async function decreaseProductAmount({ id, quantity }) {
    if (quantity === 1) return;
    try {
      await updateItem({ id, quantity: quantity - 1 });
    } catch (error) {
      console.error(error);
    }
  }

  async function increaseProductAmount({ id, quantity }) {
    try {
      await updateItem({ id, quantity: quantity + 1 });
    } catch (error) {
      console.error(error);
    }
  }

  const buttonEnabled = checkout.loaded && checkout.lineItems.length > 0;

  return (
    <React.Fragment>
      <Flex my={[3, 4]}>
        <Box p={[1, 3]}>
          <Heading fontSize={[3, 4, 5]}>{cartHeader}</Heading>
        </Box>
      </Flex>
      <Flex
        m={2}
        sx={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey',
        }}
      >
        <Box width={1}>
          <Flex
            sx={{
              borderWidth: '0px',
              borderBottomWidth: [0, '1px'],
              borderStyle: 'solid',
              borderColor: 'grey',
            }}
          >
            <Box
              width={[1, 2 / 10, 1 / 10]}
              p={[1, 3]}
              display={['none', 'block']}
            >
              Image
            </Box>
            <Box
              width={[1, 4 / 10, 5 / 10]}
              p={[1, 3]}
              display={['none', 'block']}
            >
              Product
            </Box>
            <Box width={[1, 1 / 10]} p={[1, 3]} display={['none', 'block']}>
              Price
            </Box>
            <Box width={[1, 3 / 10]} p={[1, 3]} display={['none', 'block']}>
              Amount
            </Box>
          </Flex>

          <Flex>
            <Box mt={2} width={1}>
              {checkout.loaded &&
                checkout.lineItems.map(lineItem => (
                  <React.Fragment>
                    <LineItem
                      key={lineItem.id}
                      lineItem={lineItem}
                      decreaseProductAmount={decreaseProductAmount}
                      increaseProductAmount={increaseProductAmount}
                      removeItem={removeItem}
                      mb={[4, 0]}
                    />
                    <Divider bg="grey" my={1} display={['block', 'none']} />
                  </React.Fragment>
                ))}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignItems="top" mt={1}>
            <Box p={[1, 3]}>
              <Text fontSize={3}>{cartSubtotalLabel}</Text>
              <Text>{displaySubtotalPrice}</Text>
            </Box>
            <Box p={[1, 3]}>
              <CheckoutButton
                as={'a'}
                href={buttonEnabled && webUrl}
                variant="primary"
                px={5}
                py={3}
                style={{
                  opacity: buttonEnabled ? 1 : 0.7,
                }}
              >
                {cartCheckoutButton}
              </CheckoutButton>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </React.Fragment>
  );
}

export default CartPage;
