import React from 'react';
import { SocialIcon as SocialIconComponent } from 'react-social-icons';

const SocialIcon = ({ url, bgColor }) => (
  <SocialIconComponent
    url={url}
    sx={{
      height: 48,
      width: 48,
      marginLeft: [2, 3],
      opacity: 0.8,
      ':hover,:focus,.active': {
        opacity: 1,
      },
    }}
    bgColor={bgColor}
  />
);

export default SocialIcon;
