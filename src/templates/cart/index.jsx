import React from 'react';
import CartPage from './CartPage';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import strings from './strings.json';

const { pageTitle, pageDescription } = strings;

export default props => {
  return (
    <Layout>
      <Helmet title={pageTitle} defer={false}>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <CartPage {...props} />
    </Layout>
  );
};
