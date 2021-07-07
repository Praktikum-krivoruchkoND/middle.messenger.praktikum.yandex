import { readFileSync } from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

import logoIcon from '../../assets/icons/logo-icon.svg';
import './login.scss';

/**
 * If you want to inline a file into the JavaScript bundle instead 
 * of reference it by URL, you can use the Node.js fs.readFileSync API to do that. 
 * The URL must be statically analyzable, meaning it cannot have any variables 
 * in it (other than __dirname and __filename).
 */
const template = readFileSync(__dirname + '/login.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template, { logoSrc: logoIcon });
  return parseDOMFromString(htmlString);
};
