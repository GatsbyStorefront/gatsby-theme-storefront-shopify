/** @jsx jsx */
import { jsx } from 'theme-ui';

import React, { useState, useRef } from 'react';
import { Flex, Box, Text, Heading } from 'theme-ui';
import { BsStarFill } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

import Divider from '../../components/Divider';
import Stars from '../../components/Stars';
import pluralize from '../../utils/pluralize';

import paginationStyle from './ProductReviewsPagination.styled';

const round = (number, decimalPlaces) => {
  const factorOfTen = 10 ** decimalPlaces;
  return Math.round(number * factorOfTen) / factorOfTen;
};

const ProductReviews = ({ reviews, reviewsNumber, paginationNum }) => {
  const pageCount = Math.ceil(reviewsNumber / paginationNum);

  const [reviewsToShow, setReviewsToShow] = useState(
    reviews.slice(0, paginationNum)
  );

  const handlePageClick = (data) => {
    const { selected } = data;
    let offset;
    if (selected === 0) {
      offset = 0;
    } else {
      offset = Math.ceil(selected * paginationNum);
    }

    setReviewsToShow(reviews.slice(offset, offset + paginationNum));
  };

  const getAverageStars = (reviews, reviewsNumber) => {
    let totalStars = 0;
    reviews.forEach((r) => {
      totalStars += Number(r.score);
    });
    return round(totalStars / reviewsNumber, 1);
  };

  const stars = getAverageStars(reviews, reviewsNumber);

  const reviewsTopRef = useRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  return (
    <Flex
      sx={{
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative', bottom: 100 }} ref={reviewsTopRef} />
      <Flex
        pt={3}
        px={4}
        mx="auto"
        sx={{ flexDirection: 'column', width: '100%', maxWidth: 1300 }}
      >
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          mb={30}
        >
          <Box>
            <Heading as="h3" sx={{ fontSize: [32, 32, 40] }}>
              Reviews
            </Heading>
          </Box>

          <Flex
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              flexWrap: 'wrap',
            }}
          >
            <Stars number={stars} color="secondary" size={15} />
            <Text variant="regular" ml={24}>
              {pluralize(reviewsNumber, 'review', 'reviews')}
            </Text>
          </Flex>
        </Flex>
        <Divider />
        {reviewsToShow.map((review, index) => {
          const { id, name, score, title, content, createdAt } = review;
          const datetime = new Date(createdAt);
          const formattedDate = `${datetime.getDate()}/${
            datetime.getMonth() + 1
          }/${datetime.getFullYear()}`;
          const starsArray = new Array(Number(score)).fill('');
          return (
            <Box key={id}>
              <Flex pt={11} pb={22} sx={{ flexDirection: 'column' }}>
                <Flex
                  sx={{
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                  mb={12}
                >
                  <Box>
                    <Text
                      as="span"
                      variant="regular"
                      sx={{ fontWeight: '700', fontSize: 12 }}
                    >
                      {name ? name.toUpperCase() : ''}{' '}
                    </Text>{' '}
                  </Box>
                  <Text variant="regular">{formattedDate}</Text>
                </Flex>
                <Box mb="10px" sx={{ lineHeight: '22.5px' }}>
                  {starsArray.map((s, i) => (
                    <Box as="span" color="secondary" mr={1} key={i}>
                      <BsStarFill size="15" />
                    </Box>
                  ))}
                </Box>
                <Text variant="regular" sx={{ fontWeight: '700' }} mb={17}>
                  {title || ''}
                </Text>
                <Text variant="regular" mb={17}>
                  {content || ''}
                </Text>
              </Flex>
              {index !== reviewsNumber - 1 ? <Divider /> : ''}
            </Box>
          );
        })}
        {reviewsNumber > paginationNum ? (
          <Flex
            sx={{
              width: '100%',
              justifyContent: 'center',
            }}
            mt={22}
          >
            <Box
              as="span"
              onClick={() => scrollToRef(reviewsTopRef)}
              sx={paginationStyle}
            >
              <ReactPaginate
                previousClassName="previousBtn"
                nextClassName="nextBtn"
                breakLabel="..."
                breakClassName="break-me"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
              />
            </Box>
          </Flex>
        ) : (
          ''
        )}
      </Flex>
    </Flex>
  );
};

export default ProductReviews;
