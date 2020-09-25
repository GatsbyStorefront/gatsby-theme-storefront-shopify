export default {
  '& > ul > li': {
    display: 'inline-block',
    cursor: 'pointer',
    paddingRight: '8px',
    paddingLeft: '8px',
    fontFamily: `'Helvetica Neue', 'Helvetica', sans-serif`,
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    '-webkit-font-smoothing': 'antialiased',
  },
  '& > ul > li > a': {
    color: 'secondary',
    outline: 'none',
    border: 'none',
  },
  '& > ul > li > a:hover:focus:active': {
    color: 'secondary',
    outline: 'none',
    border: 'none',
  },
  '& > ul > .nextBtn': {
    display: 'none',
  },
  '& > ul > .previousBtn': {
    display: 'none',
  },
  '& > ul > .active': {
    fontWeight: 700,
    outline: 'none',
    border: 'none',
  },
};
