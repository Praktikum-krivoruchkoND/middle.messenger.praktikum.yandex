import fs from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

import logoIcon from '../../assets/icons/logo-icon.svg';
import './signup.scss';

const template = fs.readFileSync(__dirname + '/signup.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template, { logoSrc: logoIcon });
  return parseDOMFromString(htmlString);
};
