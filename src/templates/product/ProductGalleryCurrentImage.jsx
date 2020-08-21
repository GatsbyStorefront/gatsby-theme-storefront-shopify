import React from 'react';
import GatsbyImage from 'gatsby-image';

import { useCurrentImageContext } from './CurrentImageContext';
import NoImage from '../../components/Icons/NoImage';

function ProductGalleryCurrentImage({ images, title, gatsbyImageProps }) {
  const { currentImageIndex } = useCurrentImageContext();
  const currentImage = images[currentImageIndex];

  return (
    <>
      {images && images.length > 0 ? (
        <GatsbyImage
          fluid={currentImage.localFile.childImageSharp.main}
          alt={currentImage.altText ? currentImage.altText : title}
          style={{ maxWidth: 800 }}
          data-product-image
          {...gatsbyImageProps}
        />
      ) : (
        <NoImage
          color="grey"
          p={4}
          width="500px"
          height="500px"
          sx={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'grey',
          }}
        />
      )}
    </>
  );
}
export default ProductGalleryCurrentImage;
