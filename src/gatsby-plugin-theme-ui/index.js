const colors = {
  lightPrimary: '#9575cd',
  darkPrimary: '#311b92',
  darkHighlight: '#dd2c00',

  text: '#000',
  background: '#fff',
  backgroundFooter: '#f8f8f8',
  primary: '#333',
  secondary: '#77e3da',
  muted: '#e3f9f7',
  grey: '#dddddf',
  highlight: 'hsla(205, 100%, 40%, 0.125)',
  black: '#000',
  productCollectionTitle: '#000',
  badge: '#77e3da',
  badgeNew: '#d3122a',
  badgeSoldout: '#acb4b9',
  addToCart: '#d3122a',
  menu: '#333',
  menuItem: '#333',
  menuText: '#e3f9f7',
};

const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
};

const breakpoints = ['40em', '52em', '64em'];

export const preset = {
  colors,
  breakpoints,
  mediaQueries: breakpoints.map(
    bp => `@media only screen and (min-width: ${bp})`
  ),
  fonts: {
    body: '"Work Sans", system-ui, sans-serif',
    heading: '"Work Sans", system-ui, sans-serif',
    monospace: 'Menlo, monospace',
    sans: 'Tahoma, Geneva, sans-serif',
    serif: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    mono: '"Courier New", Courier, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: '0 0 0px rgba(0, 0, 0, .125)',
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 6px 19px 6px rgba(121, 121, 121, 0.32)',
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    link: {
      color: 'primary',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      },
    },
    searchLink: {
      color: 'primary',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
        textDecoration: 'none',
      },
    },
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle',
    },
    card: {
      p: 2,
      bg: 'background',
      boxShadow: 'card',
    },
    link: {
      color: 'primary',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      },
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary',
      },
    },
  },
  buttons: {
    primary: {
      boxSizing: 'border-box',
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      borderRadius: 'default',
      border: '1px solid',
      borderColor: 'primary',
      transition: 'all 0.3s ease 0s',
      transitionProperty: 'all',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease',
      transitionDelay: '0s',
      ':hover,:focus,.active': {
        bg: 'white',
        border: '1px solid',
        borderColor: 'primary',
        color: 'primary',
        textDecoration: 'none',
      },
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary',
    },
    disabled: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'badgeSoldout',
    },
    'increase-decrease': {
      variant: 'buttons.primary',
      color: 'black',
      border: '0',
      bg: 'white',
      ':hover,:focus,.active': {
        color: 'black',
        textDecoration: 'none',
      },
    },
    pagination: {
      variant: 'buttons.primary',
      color: 'black',
      border: '0',
      bg: 'white',
      ':hover,:focus,.active': {
        color: 'black',
        textDecoration: 'none',
      },
    },
    'pagination-active': {
      variant: 'buttons.pagination',
      boxShadow: 'inset 0 0 2px',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    div: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      fontFamily: 'body',
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
};

export default preset;
