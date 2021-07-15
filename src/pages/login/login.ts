import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './login.pug';

import logoIcon from 'url:../../assets/icons/logo-icon.svg';
import './login.scss';

export default () => {
  console.log(logoIcon);
  const htmlString = compileTemplate({ logoSrc: logoIcon });
  return parseDOMFromString(htmlString);
};
