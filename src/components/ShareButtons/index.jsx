import React from 'react';
import { Flex, Box } from 'rebass';
import styled from '@emotion/styled';
import * as ReactShare from 'react-share';

const ShareButtons = ({ buttons, location }) => {
  return (
    <Flex>
      {buttons.map((button, index) => {
        let buttonName = button + 'ShareButton';
        let buttonIcon = button + 'Icon';
        let ShareButton = styled(ReactShare[buttonName])`
          &:hover {
            cursor: pointer;
          }
        `;
        let Icon = ReactShare[buttonIcon];

        return (
          <Box mr={[1, 2]} key={index}>
            <ShareButton url={location} media={location} key={buttonName}>
              <Icon size={38} round={true} key={buttonIcon} />
            </ShareButton>
          </Box>
        );
      })}
    </Flex>
  );
};

export default ShareButtons;
