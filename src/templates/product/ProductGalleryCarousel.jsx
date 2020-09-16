/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import GatsbyImage from 'gatsby-image';
import { Box } from 'rebass';

import NoImage from '../../components/Icons/NoImage';
import ChevronLeft from '../../components/Icons/ChevronLeft';
import ChevronRight from '../../components/Icons/ChevronRight';
import strings from './strings.json';

const { ariaNextButtonLabel, ariaBackButtonLabel } = strings;

const ProductGalleryCarousel = ({
  images,
  title,
  gatsbyImageProps,
  maxContainerHeight = 500,
}) => {
  return (
    <>
      {images && images.length === 1 ? (
        <GatsbyImage
          fluid={images[0].localFile.childImageSharp.main}
          alt={images[0].altText ? images[0].altText : title}
          style={{ maxWidth: 800 }}
          data-product-image
          {...gatsbyImageProps}
        />
      ) : (
        ''
      )}
      <Box sx={{ position: 'relative' }}>
        <Slider aria-label="product images slider">
          {images && images.length > 1
            ? images.map((image, index) => {
                return (
                  <Slide index={index}>
                    <GatsbyImage
                      fluid={image.localFile.childImageSharp.main}
                      alt={image.altText ? image.altText : title}
                      style={{ maxWidth: 800 }}
                      data-product-image
                      {...gatsbyImageProps}
                    />
                  </Slide>
                );
              })
            : ''}
        </Slider>
        {images && images.length > 1 ? (
          <>
            <ButtonBack
              aria-label={ariaBackButtonLabel}
              sx={{
                display: ['none', 'block'],
                position: 'absolute',
                bottom: '48%',
                left: 1,
                zIndex: 2,
                border: 0,
                bg: 'transparent',
                color: 'primary',
                ':disabled': {
                  opacity: 0.3,
                },
              }}
            >
              <ChevronLeft width="40px" height="40px" />
            </ButtonBack>
            <ButtonNext
              aria-label={ariaBackButtonLabel}
              sx={{
                display: ['none', 'block'],
                position: 'absolute',
                bottom: '48%',
                right: 1,
                zIndex: 2,
                border: 0,
                bg: 'transparent',
                color: 'primary',
                ':disabled': {
                  opacity: 0.3,
                },
              }}
            >
              <ChevronRight width="40px" height="40px" />
            </ButtonNext>
          </>
        ) : (
          ''
        )}
      </Box>

      {images && images.length === 0 ? (
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
      ) : (
        ''
      )}
    </>
  );
};

export default ProductGalleryCarousel;
