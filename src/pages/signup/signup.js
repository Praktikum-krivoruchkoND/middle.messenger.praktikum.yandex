import fs from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

const template = fs.readFileSync(__dirname + '/signup.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template, { logoSrc: 'icons/logo-icon.svg' });
  return parseDOMFromString(htmlString);
};
