/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { useThemeUI, Flex, Box, Button, Heading, Text } from 'theme-ui';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';

import strings from './strings.json';
import Divider from '../../components/Divider';
import formatPrice from '../../utils/formatPrice';
import { useShopifyFunctions } from '../../hooks/useShopifyFunctions';
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

  const { theme } = useThemeUI();

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
    <Box sx={{ px: 2, pt: 3, maxWidth: 1300 }}>
      <Flex my={[3, 4]}>
        <Box p={[1, 3]}>
          <Heading sx={{ fontSize: [3, 4, 5] }}>{cartHeader}</Heading>
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
        <Box sx={{ width: '100%' }}>
          <Flex
            sx={{
              borderWidth: '0px',
              borderBottomWidth: [0, '1px'],
              borderStyle: 'solid',
              borderColor: 'grey',
            }}
          >
            <Box
              sx={{
                width: ['100%', '20%', '10%'],
                display: ['none', 'block'],
              }}
              p={[1, 3]}
            >
              Image
            </Box>
            <Box
              sx={{
                width: ['100%', '40%', '50%'],
                display: ['none', 'block'],
              }}
              p={[1, 3]}
            >
              Product
            </Box>
            <Box
              sx={{
                width: ['100%', '10%'],
                display: ['none', 'block'],
              }}
              p={[1, 3]}
            >
              Price
            </Box>
            <Box
              sx={{
                width: ['100%', '30%'],
                display: ['none', 'block'],
              }}
              p={[1, 3]}
            >
              Amount
            </Box>
          </Flex>

          <Flex>
            <Box
              mt={2}
              sx={{
                width: '100%',
              }}
            >
              {checkout.loaded &&
                checkout.lineItems.map((lineItem) => (
                  <React.Fragment key={lineItem.id}>
                    <LineItem
                      key={lineItem.id}
                      lineItem={lineItem}
                      decreaseProductAmount={decreaseProductAmount}
                      increaseProductAmount={increaseProductAmount}
                      removeItem={removeItem}
                      mb={[4, 0]}
                    />
                    <Box sx={{ display: ['block', 'none'] }}>
                      <Divider bg="grey" my={1} />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Flex>

          <Flex
            sx={{ justifyContent: 'space-between', alignItems: 'top' }}
            mt={1}
          >
            <Box p={3}>
              <Text sx={{ fontSize: 3 }}>{cartSubtotalLabel} </Text>
              <Text>{displaySubtotalPrice}</Text>
            </Box>
            <Box p={3}>
              <CheckoutButton
                as={'a'}
                href={buttonEnabled && webUrl}
                variant="primary"
                px={[3, 5]}
                py={[2, 3]}
                style={{
                  opacity: buttonEnabled ? 1 : 0.7,
                }}
                theme={theme}
              >
                {cartCheckoutButton}
              </CheckoutButton>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CartPage;
