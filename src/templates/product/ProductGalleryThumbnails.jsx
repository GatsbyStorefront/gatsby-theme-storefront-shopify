import React from 'react';
import styled from '@emotion/styled';
import GatsbyImage from 'gatsby-image';
import { Flex, Box } from 'rebass';
import { useCurrentImageContext } from './CurrentImageContext';

const ThumbnailBox = styled(Box)(
  ({ theme, maxImageHeight, maxImageWidth, currentImageIndex, index }) => ({
    maxWidth: maxImageWidth,
    maxHeight: maxImageHeight,
    transition: '0.5s ease all',
    cursor: 'pointer',
    border: `1px solid ${
      currentImageIndex !== index ? 'transparent' : theme.colors.primary
    }`,
  })
);

const ThumbnailFlex = styled(Flex)(({ theme, transformPx }) => ({
  transition: '0.5s ease all',
  transform: `translateX(${transformPx}px)`,
  [theme.mediaQueries[1]]: {
    transform: `translateY(${transformPx}px)`,
  },
}));

function ProductGalleryThumbnails({
  images,
  title,
  maxImageHeight = 100,
  maxImageWidth = 100,
  maxContainerHeight = 500,
}) {
  const { currentImageIndex, setCurrentImageIndex } = useCurrentImageContext();

  function calculateTransform() {
    if (currentImageIndex < 1) {
      return 0;
    }

    if (currentImageIndex >= images.length - 1) {
      return (images.length - 2.5) * -(maxImageHeight + 16);
    }

    return (currentImageIndex - 1) * -(maxImageHeight + 8);
  }

  return (
    <Box
      width={1}
      aria-hidden
      style={{ maxHeight: maxContainerHeight, overflow: 'hidden' }}
    >
      <ThumbnailFlex
        flexDirection={['row', null, 'column']}
        width={[images.length * maxImageWidth, null, 1]}
        transformPx={calculateTransform()}
      >
        {images.map((image, index) => (
          <ThumbnailBox
            key={image.id}
            index={index}
            currentImageIndex={currentImageIndex}
            maxImageHeight={maxImageHeight}
            maxImageWidth={maxImageWidth}
            width={['300px', null, 'auto']}
            onClick={() => setCurrentImageIndex(index)}
            ml={[0, null, 2]}
            mr={[2, null, 0]}
            my={1}
          >
            <GatsbyImage
              fluid={image.localFile.childImageSharp.thumbnail}
              alt={image.altText ? image.altText : title}
            />
          </ThumbnailBox>
        ))}
      </ThumbnailFlex>
    </Box>
  );
}

export default ProductGalleryThumbnails;
