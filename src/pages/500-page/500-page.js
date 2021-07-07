import { readFileSync } from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

import './500-page.scss';

const template = readFileSync(__dirname + '/500-page.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template, { cachePrevent: Date.now() });
  return parseDOMFromString(htmlString);
};
