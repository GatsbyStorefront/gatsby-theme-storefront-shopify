import React, { Fragment } from 'react';
import GatsbyLink from 'gatsby-link';
import { Flex, Button } from 'rebass';

const Pagination = props => {
  const { numPages, currentPage, shopifyThemePath } = props;
  const showNumbers = 2;

  let prevLink = false;
  let nextLink = false;

  if (currentPage !== 1) {
    prevLink = shopifyThemePath + '/' + (currentPage - 1);
  }
  if (currentPage === 2) {
    prevLink = shopifyThemePath;
  }
  if (currentPage !== numPages) {
    nextLink = shopifyThemePath + '/' + (currentPage + 1);
  }

  return (
    <Fragment>
      {numPages > 1 ? (
        <Flex justifyContent="center">
          {prevLink ? (
            <Button
              as={GatsbyLink}
              to={prevLink}
              mx={2}
              rel="prev"
              variant="pagination"
            >
              {'<'}
            </Button>
          ) : (
            ''
          )}
          {Array.from({ length: numPages }).map((_, i) => {
            let pageNum = i + 1;

            if (
              pageNum >= Math.max(1, currentPage - showNumbers) &&
              pageNum <= Math.min(currentPage + showNumbers, numPages)
            ) {
              if (pageNum === currentPage) {
                return (
                  <Button mx={2} variant="pagination-active" key={pageNum}>
                    {pageNum}
                  </Button>
                );
              } else {
                let link;
                pageNum === 1
                  ? (link = shopifyThemePath)
                  : (link = shopifyThemePath + '/' + pageNum);
                return (
                  <Button
                    as={GatsbyLink}
                    to={link}
                    mx={2}
                    variant="pagination"
                    key={pageNum}
                  >
                    {pageNum}
                  </Button>
                );
              }
            } else {
              return '';
            }
          })}
          {nextLink ? (
            <Button
              as={GatsbyLink}
              to={nextLink}
              mx={2}
              rel="next"
              variant="pagination"
            >
              >
            </Button>
          ) : (
            ''
          )}
        </Flex>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default Pagination;
