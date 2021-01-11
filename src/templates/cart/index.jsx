import React from 'react';
import CartPage from './CartPage';
import { Helmet } from 'react-helmet';

import strings from './strings.json';

const { pageTitle, pageDescription } = strings;

export default (props) => {
  return (
    <>
      <Helmet title={pageTitle} defer={false}>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <CartPage {...props} />
    </>
  );
};
