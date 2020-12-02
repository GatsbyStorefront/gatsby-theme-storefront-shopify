import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';
import { CarouselProvider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import strings from './strings.json';
import substrDescription from '../../utils/substrDescription';
import ProductCounter from '../../components/ProductCounter';
import Divider from '../../components/Divider';
import Breadcrumbs from '../../components/Breadcrumbs';

import ProductGalleryThumbnails from './ProductGalleryThumbnails';
import ProductGalleryCarousel from './ProductGalleryCarousel';
import { CurrentVariantContextProvider } from './CurrentVariantContext';
import ProductVariantSelector from './ProductVariantSelector';
import ProductVariantAddToCart from './ProductVariantAddToCart';
import ProductVariantPrice from './ProductVariantPrice';
import ProductVariantSku from './ProductVariantSku';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';

// react-payment-icons-inline heavily increases webpack bundle size. Need to find alternative solution. Will disable it for now.
// const Payments = loadable(() => import('../../components/Payments'));
const ShareButtons = loadable(() => import('../../components/ShareButtons'));
const DescriptionBox = loadable(() => import('./DescriptionBox'));

const {
  productQuantityLabel,
  paymentsLabel,
  shareButtonsLabel,
  vendorLabel,
  productTypeLabel,
} = strings;

function ProductPage({ data, pageContext, location }) {
  const [currentAmount, setCurrentAmount] = useState(1);

  const {
    product: {
      title,
      description,
      images,
      variants,
      options,
      vendor,
      productType,
      cmsConnection,
      reviewsConnection: reviews,
    },
  } = data;

  const cmsData = cmsConnection || {};

  const {
    shortDescription,
    descriptionHtml: withoutShortDescription,
    descriptionSections: sections,
  } = cmsData;

  // There are cases when product doesn't belong to any collection.
  // In this case we need to set a guard in case "collection" and "fields" props undefined.
  const { collection } = data || {};
  const { fields } = collection || {};
  const { title: collectionTitle } = collection || {
    title: null,
  };
  const { shopifyThemePath: collectionPath } = fields || {
    shopifyThemePath: null,
  };

  const { cartUrl } = pageContext;
  const {
    shareButtons,
    productImagesCarouselProps,
    reviewsNumberPerPage,
  } = data.store.siteMetadata.gatsbyStorefrontConfig;

  function increaseAmount() {
    setCurrentAmount((a) => a + 1);
  }

  function decreaseAmount() {
    setCurrentAmount((a) => (a <= 1 ? 1 : a - 1));
  }

  return (
    <>
      <Helmet>
        {/* Google's meta description length is up to 920 pixels, which might
          allow for up to 158 characters. On mobile devices, the max limit is
          about 680 pixels and 120 characters. Oct 1, 2019 */}
        <meta
          name="description"
          content={
            shortDescription
              ? substrDescription(shortDescription, 158)
              : substrDescription(description, 158)
          }
        />
      </Helmet>

      <CarouselProvider
        naturalSlideWidth={
          productImagesCarouselProps.naturalSlideWidth
            ? productImagesCarouselProps.naturalSlideWidth
            : images[0]
            ? images[0].localFile.childImageSharp.main.width
            : 1
        }
        naturalSlideHeight={
          productImagesCarouselProps.naturalSlideHeight
            ? productImagesCarouselProps.naturalSlideHeight
            : images[0]
            ? images[0].localFile.childImageSharp.main.height
            : 1
        }
        totalSlides={images.length}
      >
        <Flex
          flexDirection={['column', null, 'row']}
          pt={3}
          px={2}
          mx="auto"
          sx={{ maxWidth: 1300 }}
          fontFamily="body"
        >
          {images && images.length > 1 ? (
            <Box
              width={[1, null, 1 / 10]}
              py={2}
              px={[2, null, 0]}
              order={[2, null, 1]}
            >
              <ProductGalleryThumbnails
                images={images}
                title={title}
                maxContainerHeight={600}
              />
            </Box>
          ) : (
            ''
          )}
          <Box
            width={[1, null, 6 / 10]}
            ml="auto"
            py={2}
            pr={images && images.length > 1 ? [2, null, 3] : [2, null, 3]}
            pl={images && images.length > 1 ? [2, null, 3] : [2, null, 0]}
            data-product-image-container
            order={[1, null, 2]}
          >
            {/* Breadcrumbs block 1 for mobile */}
            <Box mb={1} sx={{ display: ['block', 'block', 'none'] }}>
              <Breadcrumbs
                productTitle={title}
                collectionTitle={collectionTitle}
                collectionPath={collectionPath}
                separator="/"
              />
            </Box>

            <ProductGalleryCarousel
              images={images}
              title={title}
              maxContainerHeight={productImagesCarouselProps.naturalSlideHeight}
            />
          </Box>

          <Flex
            flexDirection="column"
            width={[1, null, 4 / 10]}
            px={[2, null, 3]}
            data-product-info
            order={3}
          >
            {/* Breadcrumbs block 2 for desktop */}
            <Box sx={{ display: ['none', 'none', 'block'] }} pt={1}>
              <Breadcrumbs
                productTitle={title}
                collectionTitle={collectionTitle}
                collectionPath={collectionPath}
                separator="/"
              />
            </Box>

            <CurrentVariantContextProvider>
              <Box>
                <Text as="h1" mb={3} data-title-box>
                  {title}
                </Text>
                <ProductVariantPrice
                  initialDisplayPrice={variants[0].price}
                  mb={3}
                />
                {shortDescription ? (
                  <DescriptionBox
                    source={shortDescription}
                    escapeHtml={false}
                    mb={3}
                  />
                ) : (
                  ''
                )}
              </Box>

              <ProductVariantSelector
                variants={variants}
                options={options}
                pageContext={pageContext}
                mb={4}
              />

              <Flex alignItems="center" mb={4}>
                <Box mr={2}>
                  <Text>{productQuantityLabel}</Text>
                </Box>
                <Box width={0.2}>
                  <ProductCounter
                    decreaseAmount={decreaseAmount}
                    increaseAmount={increaseAmount}
                    currentAmount={currentAmount}
                  />
                </Box>
              </Flex>

              <Flex mb={4}>
                <Box>
                  <ProductVariantAddToCart
                    amount={currentAmount}
                    cartUrl={cartUrl}
                  />
                </Box>
              </Flex>

              <Flex mb={4}>
                <Box>
                  <Text>{paymentsLabel}</Text>
                  {/* <Payments payments={payments} /> */}
                </Box>
              </Flex>

              <Divider bg="grey" mb={4} />

              <ProductVariantSku />
            </CurrentVariantContextProvider>

            {vendor ? (
              <Flex mb={4}>
                <Box mr={2}>
                  <Text>{vendorLabel}</Text>
                </Box>
                <Box>{vendor}</Box>
              </Flex>
            ) : (
              ''
            )}

            {productType ? (
              <Flex mb={4}>
                <Box mr={2}>
                  <Text>{productTypeLabel}</Text>
                </Box>
                <Box>{productType}</Box>
              </Flex>
            ) : (
              ''
            )}

            <Flex mb={4} alignItems="center">
              <Box mr={2}>
                <Text>{shareButtonsLabel}</Text>
              </Box>
              <Box>
                <ShareButtons buttons={shareButtons} location={location.href} />
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          pt={3}
          px={4}
          mx="auto"
          style={{ maxWidth: 1300 }}
          fontFamily="body"
        >
          <Box width={1}>
            <Divider bg="grey" mb={4} />
            <ProductDescription
              description={withoutShortDescription || description}
              sections={sections}
            />
          </Box>
        </Flex>

        {reviews && reviews.length > 0 ? (
          <ProductReviews
            reviews={reviews}
            reviewsNumber={reviews.length}
            paginationNum={reviewsNumberPerPage}
          />
        ) : (
          ''
        )}
      </CarouselProvider>
    </>
  );
}

export default ProductPage;
