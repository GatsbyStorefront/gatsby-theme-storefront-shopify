import React from 'react';
import { Box } from 'rebass';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

const Stars = ({ number, color, size }) => {
  let lastStarIsFull = false;
  let starsArray = new Array(Math.floor(Number(number))).fill('');
  if (number / Math.round(number) === 1) {
    lastStarIsFull = true;
  } else if (Math.round(number) - number > 0) {
    lastStarIsFull = true;
    starsArray.length += 1;
    starsArray = starsArray.fill('');
  } else if (Math.round(number) - number < 0) {
    lastStarIsFull = false;
    starsArray.length += 1;
    starsArray = starsArray.fill('');
  } else if (Math.round(number) - number === 0) {
    lastStarIsFull = false;
    starsArray.length += 1;
    starsArray = starsArray.fill('');
  }

  return (
    <>
      {starsArray.map((s, i) => {
        if (i < starsArray.length - 1) {
          return (
            <Box as="span" color={color} mr={1} key={i}>
              <BsStarFill size={size} />
            </Box>
          );
        } else if (lastStarIsFull) {
          return (
            <Box as="span" color={color} mr={1} key={i}>
              <BsStarFill size={size} />
            </Box>
          );
        } else {
          return (
            <Box as="span" color={color} mr={1} key={i}>
              <BsStarHalf size={size} />
            </Box>
          );
        }
      })}
    </>
  );
};

export default Stars;
