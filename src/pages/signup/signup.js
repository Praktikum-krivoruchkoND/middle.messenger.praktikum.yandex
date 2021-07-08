import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './signup.pug';

import logoIcon from 'url:../../assets/icons/logo-icon.svg';
import './signup.scss';

export default () => {
  const htmlString = compileTemplate({ logoSrc: logoIcon });
  return parseDOMFromString(htmlString);
};
