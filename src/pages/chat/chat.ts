import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './chat.pug';

import './chat.scss';

export default () => {
  const htmlString = compileTemplate();
  return parseDOMFromString(htmlString);
};
