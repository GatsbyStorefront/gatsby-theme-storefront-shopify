import shortcodeParser from './shortcode-parser';

const getShortTagContent = (tag, text) => {
  let tagTemp;
  let optsTemp;
  shortcodeParser.parseInContext(text, {
    [tag]: (buf, opts) => {
      tagTemp = buf;
      optsTemp = opts;
      return ''; // return but not using it
    },
  });
  return { tag: tagTemp, options: optsTemp };
};

export default getShortTagContent;
