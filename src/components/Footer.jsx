/** @jsx jsx */
/* eslint no-unused-vars: 0 */
import { jsx } from 'theme-ui';

import React from 'react';
import { useThemeUI } from 'theme-ui';
import { Flex, Box, Text, Link } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { Link as GatsbyLink } from 'gatsby';
import loadable from '@loadable/component';
// import { SocialIcon } from 'react-social-icons';

const SocialIcon = loadable(() => import('./SocialIcon'));

const validURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

function Footer() {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            email
            company
            location
            address
            phone
            workingDays
            workingHours
            socialNetworks
            footerLinks {
              name
              link
            }
          }
        }
      }
    }
  `);

  const {
    email,
    company,
    location,
    address,
    phone,
    workingDays,
    workingHours,
    socialNetworks,
    footerLinks,
  } = data.site.siteMetadata.gatsbyStorefrontConfig;

  const { theme } = useThemeUI();

  const year = new Date().getFullYear();

  return (
    <Box bg="backgroundFooter" py={[1, 2, 3, 4]} mt={[2, 3, 4]}>
      <Box
        py={2}
        as="footer"
        sx={{ maxWidth: 1300, width: '100%', height: '100%' }}
        mx="auto"
        px={2}
        pt={3}
      >
        <Flex sx={{ flexWrap: 'wrap', alignItems: 'center', mb: [2, 3, 4] }}>
          <Flex
            sx={{
              width: ['100%', '100%', 100 * (3 / 4) + '%'],
              justifyContent: ['center', 'space-between'],
              flexWrap: 'wrap',
              mb: 3,
            }}
          >
            {footerLinks
              ? footerLinks.map((link, index) => {
                  // If link is valid url use <a>
                  // else use gatsby-link
                  if (validURL(link.link)) {
                    return (
                      <Text key={index} mr={[3, 0]} my={[2, 0]}>
                        <Link href={link.link}>{link.name}</Link>
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={index} mr={[3, 0]} my={[2, 0]}>
                        <GatsbyLink to={link.link} sx={theme.variants.link}>
                          {link.name}
                        </GatsbyLink>
                      </Text>
                    );
                  }
                })
              : ''}
          </Flex>

          <Flex
            sx={{
              width: ['100%', '100%', 100 / 4 + '%'],
              justifyContent: ['center', 'center', 'flex-end'],
              mr: 'auto',
              pl: 2,
              mb: 3,
            }}
          >
            {socialNetworks
              ? socialNetworks.map((socialNetwork, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        marginLeft: [2, 3],
                        opacity: 0.8,
                        '&:hover,&:focus,&:active': {
                          opacity: 1,
                        },
                      }}
                    >
                      <SocialIcon
                        url={socialNetwork}
                        bgColor={theme.colors.primary}
                      />
                    </Box>
                  );
                })
              : ''}
          </Flex>
        </Flex>

        <Flex>
          <Box>
            <Text sx={{ fontSize: [1, 2] }}>
              © {year} {company || ''}
              {address || location ? ' | ' : ''} {address} {location}
              {phone || workingDays || workingHours ? ' | ' : ''}
              {phone} {workingDays} {workingHours}
              {email ? ' | ' : ''} {email}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default React.memo(Footer);
