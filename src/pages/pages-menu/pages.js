import fs from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

const template = fs.readFileSync(__dirname + '/pages.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template);
  return parseDOMFromString(htmlString);
};
