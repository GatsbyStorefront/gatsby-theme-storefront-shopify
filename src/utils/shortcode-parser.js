/* 
https://github.com/flamenx01/shortcode-parser
lib/shortcode-parser.js 
*/

const util = require('util');

const shortcodes = {};

const SHORTCODE_ATTRS = /(\s+([a-z0-9\-_]+|([a-z0-9\-_]+)\s*=\s*([a-z0-9\-_]+|\d+\.\d+|'[^']*'|"[^"]*")))*/
  .toString()
  .slice(1, -1);
const SHORTCODE_SLASH = /\s*\/?\s*/.toString().slice(1, -1);
const SHORTCODE_OPEN = /\[\s*%s/.toString().slice(1, -1);
const SHORTCODE_RIGHT_BRACKET = '\\]';
const SHORTCODE_CLOSE = /\[\s*\/\s*%s\s*\]/.toString().slice(1, -1);
const SHORTCODE_CONTENT = /(.|\n|)*?/.toString().slice(1, -1);
const SHORTCODE_SPACE = /\s*/.toString().slice(1, -1);

function typecast(val) {
  val = val.trim().replace(/(^['"]|['"]$)/g, '');
  if (/^\d+$/.test(val)) {
    return parseInt(val, 10);
  } else if (/^\d+\.\d+$/.test(val)) {
    return parseFloat(val);
  } else if (/^(true|false)$/.test(val)) {
    return val === 'true';
  } else if (/^undefined$/.test(val)) {
    return undefined;
  } else if (/^null$/i.test(val)) {
    return null;
  } else {
    return val;
  }
}

function closeTagString(name) {
  return /^[^a-z0-9]/.test(name)
    ? util.format('[%s]?%s', name[0].replace('$', '\\$'), name.slice(1))
    : name;
}

function parseShortcode(name, buf, inline) {
  let regex;
  let match;
  // data = {},
  let attr = {};

  if (inline) {
    regex = new RegExp(
      `^${util.format(
        SHORTCODE_OPEN,
        name
      )}${SHORTCODE_ATTRS}${SHORTCODE_SPACE}${SHORTCODE_SLASH}${SHORTCODE_RIGHT_BRACKET}`,
      'i'
    );
  } else {
    regex = new RegExp(
      `^${util.format(
        SHORTCODE_OPEN,
        name
      )}${SHORTCODE_ATTRS}${SHORTCODE_SPACE}${SHORTCODE_RIGHT_BRACKET}`,
      'i'
    );
  }

  while ((match = buf.match(regex)) !== null) {
    const key = match[3] || match[2];
    const val = match[4] || match[3];
    const pattern = match[1];
    if (pattern) {
      const idx = buf.lastIndexOf(pattern);
      attr[key] = val !== undefined ? typecast(val) : true;
      buf = buf.slice(0, idx) + buf.slice(idx + pattern.length);
    } else {
      break;
    }
  }

  attr = Object.keys(attr)
    .reverse()
    .reduce(function (prev, current) {
      prev[current] = attr[current];
      return prev;
    }, {});

  buf = buf
    .replace(regex, '')
    .replace(
      new RegExp(util.format(SHORTCODE_CLOSE, closeTagString(name))),
      ''
    );

  return {
    attr,
    content: inline ? buf : buf.replace(/(^\n|\n$)/g, ''),
  };
}

module.exports = {
  _shortcodes: shortcodes,

  add(name, callback) {
    if (typeof name === 'object') {
      const ob = name;
      for (const m in ob) {
        // Adding methods from instance and prototype
        if (ob[m] instanceof Function) {
          shortcodes[m] = ob[m];
        }
      }
    } else {
      shortcodes[name] = callback;
    }
  },

  remove(name) {
    delete shortcodes[name];
  },

  parse(buf, extra, context) {
    context = context || shortcodes;

    extra = extra || {};

    for (const name in context) {
      // Allow absence of first char if not alpha numeric. E.g. [#shortcode]...[/shortcode]

      const regex = {
        wrapper: new RegExp(
          util.format(SHORTCODE_OPEN, name) +
            SHORTCODE_ATTRS +
            SHORTCODE_RIGHT_BRACKET +
            SHORTCODE_CONTENT +
            util.format(SHORTCODE_CLOSE, closeTagString(name)),
          'gi'
        ),
        inline: new RegExp(
          util.format(SHORTCODE_OPEN, name) +
            SHORTCODE_ATTRS +
            SHORTCODE_SLASH +
            SHORTCODE_RIGHT_BRACKET,
          'gi'
        ),
      };

      let matches = buf.match(regex.wrapper);

      if (matches) {
        for (var m, data, i = 0, len = matches.length; i < len; i++) {
          m = matches[i];
          data = parseShortcode(name, m);
          buf = buf.replace(
            m,
            context[name].call(null, data.content, data.attr, extra)
          );
        }
      }

      matches = buf.match(regex.inline);

      if (matches) {
        while ((m = matches.shift()) !== undefined) {
          data = parseShortcode(name, m, true);
          buf = buf.replace(
            m,
            context[name].call(null, data.content, data.attr, extra)
          );
        }
      }
    }

    return buf;
  },

  parseInContext(buf, context, data) {
    return this.parse(buf, data, context);
  },
};
