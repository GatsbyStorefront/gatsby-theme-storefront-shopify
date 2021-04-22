/** @jsx jsx */
import { jsx } from 'theme-ui';

import React from 'react';
import { Text } from 'theme-ui';

const DescriptionBox = (props) => {
  return <Text dangerouslySetInnerHTML={{ __html: props.source }} />;
};

export default DescriptionBox;
