import { readFileSync } from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

import './chat.scss';

const template = readFileSync(__dirname + '/chat.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template);
  return parseDOMFromString(htmlString);
};
