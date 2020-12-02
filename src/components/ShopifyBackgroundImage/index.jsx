import React from 'react';
import { getSizedImageUrl } from '@shopify/theme-images';
import styled from '@emotion/styled';

const BgImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: 50% 0%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 0%;

  @media (-webkit-min-device-pixel-ratio: 1.3), (min-resolution: 120dpi) {
    background-image: url(${({ src, maxSize }) =>
      getSizedImageUrl(src, maxSize + 'x@2x')});
  }

  background-image: url(${({ src, maxSize }) =>
    getSizedImageUrl(src, maxSize + 'x')});
`;

const ShopifyBackgroundImage = ({ src, maxSize, children }) => {
  return (
    <BgImage src={src} maxSize={maxSize}>
      {children}
    </BgImage>
  );
};

export default ShopifyBackgroundImage;
