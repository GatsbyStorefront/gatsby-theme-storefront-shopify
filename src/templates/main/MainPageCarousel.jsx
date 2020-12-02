/** @jsx jsx */
/* eslint no-unused-vars: 0 */
import React, { useState } from 'react';
import { jsx, useThemeUI } from 'theme-ui';
import { Box } from 'rebass';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './carousel.css';

import MainPageCollectionBlock from './MainPageCollectionBlock';
import MainPageProductBlock from './MainPageProductBlock';
import ChevronLeft from '../../components/Icons/ChevronLeft';
import ChevronRight from '../../components/Icons/ChevronRight';
import strings from './strings.json';

const { ariaNextButtonLabel, ariaBackButtonLabel } = strings;

const MainPageCarousel = (props) => {
  const { carousel, data } = props;

  const {
    theme: { breakpoints },
  } = useThemeUI();

  let naturalSlideHeightMediaQuery;

  if (typeof window !== `undefined`) {
    naturalSlideHeightMediaQuery =
      window && window.matchMedia(`(max-width: ${breakpoints[1]})`);
    naturalSlideHeightMediaQuery.addEventListener('change', (e) => {});
  }

  const [naturalSlideHeight, setNaturalSlideHeight] = useState(
    naturalSlideHeightMediaQuery && naturalSlideHeightMediaQuery.matches
      ? 100
      : 60
  );

  if (typeof window !== `undefined`) {
    naturalSlideHeightMediaQuery.addEventListener('change', (e) => {
      setNaturalSlideHeight(e.matches ? 100 : 60);
    });
  }

  return (
    <Box
      mx={2}
      px={1}
      sx={{
        position: 'relative',
        textAlign: 'center',
        display: ['none', 'block'],
        maxWidth: 1300,
      }}
    >
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={naturalSlideHeight}
        totalSlides={carousel.children.length}
        isPlaying
        infinite
      >
        <Slider>
          {carousel.children.map((slide, index) => {
            if (slide.type === 'collection') {
              return (
                <Slide key={index} index={index}>
                  {data.collections.nodes.map((collection, index) => {
                    if (collection.handle === slide.handle) {
                      return (
                        <MainPageCollectionBlock
                          block={slide}
                          collection={collection}
                          key={index}
                          textColor={
                            slide.textColor ? slide.textColor : undefined
                          }
                          textBgColor={
                            slide.textBgColor ? slide.textBgColor : undefined
                          }
                          buttonText={
                            slide.buttonText ? slide.buttonText : undefined
                          }
                          buttonTextColor={
                            slide.buttonTextColor
                              ? slide.buttonTextColor
                              : undefined
                          }
                          buttonBgColor={
                            slide.buttonBgColor
                              ? slide.buttonBgColor
                              : undefined
                          }
                        />
                      );
                    } else {
                      return '';
                    }
                  })}
                </Slide>
              );
            } else if (slide.type === 'product') {
              return (
                <Slide key={index} index={index}>
                  {data.products.nodes.map((product, index) => {
                    if (product.handle === slide.handle) {
                      return (
                        <MainPageProductBlock
                          block={slide}
                          product={product}
                          key={index}
                          textColor={slide.textColor}
                          textBgColor={slide.textBgColor}
                        />
                      );
                    } else {
                      return '';
                    }
                  })}
                </Slide>
              );
            } else {
              return '';
            }
          })}
        </Slider>

        <ButtonBack
          aria-label={ariaBackButtonLabel}
          sx={{
            display: ['none', 'block'],
            position: 'absolute',
            bottom: ['36%', '50%'],
            left: 1,
            'z-index': '2',
            border: 0,
            bg: 'transparent',
            color: 'primary',
            py: 2,
            px: [0, 3],
          }}
        >
          <ChevronLeft width="40px" height="40px" />
        </ButtonBack>

        <ButtonNext
          aria-label={ariaNextButtonLabel}
          sx={{
            display: ['none', 'block'],
            position: 'absolute',
            bottom: ['36%', '50%'],
            right: 1,
            'z-index': '2',
            border: 0,
            bg: 'transparent',
            color: 'primary',
            py: 2,
            px: [0, 3],
          }}
        >
          <ChevronRight width="40px" height="40px" />
        </ButtonNext>

        <DotGroup
          sx={{
            display: ['none', 'block'],
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translate(-50%)',
            'z-index': '2',
            border: 0,
            bg: 'transparent',
            color: 'primary',
            py: '2',
            px: '3',
          }}
        />
      </CarouselProvider>
    </Box>
  );
};

export default MainPageCarousel;
