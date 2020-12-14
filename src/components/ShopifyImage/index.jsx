import React from 'react';
import { getSizedImageUrl } from '@shopify/theme-images';

const base64EncodedPixel =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcc/x4PQAHXALLWOhBnQAAAABJRU5ErkJggg==';

const ShopifyImage = ({
  src,
  alt = '',
  sizes = '100vw',
  base64 = base64EncodedPixel,
  aspectRatio = 1,
}) => {
  const style = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    opacity: 1,
    transition: 'none 0s ease 0s',
  };
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
      <div
        aria-hidden="true"
        style={{ width: '100%', paddingBottom: `${100 / aspectRatio}%` }}
      />
      <img aria-hidden="true" src={base64} alt={alt} style={style} />
      <picture>
        <source
          sizes={sizes}
          srcSet={`
          ${getSizedImageUrl(src, '98x98_crop_top')} 90w,
          ${getSizedImageUrl(src, '100x')} 100w,
          ${getSizedImageUrl(src, '200x')} 200w,
          ${getSizedImageUrl(src, '300x')} 300w,
          ${getSizedImageUrl(src, '400x')} 400w,
          ${getSizedImageUrl(src, '500x')} 500w,
          ${getSizedImageUrl(src, '600x')} 600w,
          ${getSizedImageUrl(src, '700x')} 700w,
          ${getSizedImageUrl(src, '800x')} 800w,
          ${getSizedImageUrl(src, '900x')} 900w,
          ${getSizedImageUrl(src, '1000x')} 1000w,
          ${getSizedImageUrl(src, '1100x')} 1100w,
          ${getSizedImageUrl(src, '1200x')} 1200w,
          ${getSizedImageUrl(src, '1200x')} 1300w,
        `}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          style={style}
        />
      </picture>
    </div>
  );
};

export default ShopifyImage;
