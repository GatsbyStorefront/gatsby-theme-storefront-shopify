import React from 'react';
import { Text } from 'rebass';

const DescriptionBox = (props) => {
  return <Text dangerouslySetInnerHTML={{ __html: props.source }} />;
};

export default DescriptionBox;
