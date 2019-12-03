import React from 'react';
import { Text } from 'rebass';
import ReactMarkdown from 'react-markdown/with-html';

const DescriptionBox = props => {
  return (
    <Text>
      <ReactMarkdown {...props} />
    </Text>
  );
};

export default DescriptionBox;
