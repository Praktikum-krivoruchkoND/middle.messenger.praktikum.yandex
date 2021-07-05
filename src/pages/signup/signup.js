import pug from 'pug';

import template from './signup.pug';
import parseDOMFromString from '../../utils/parseDOMFromString';

export default () => {
  const htmlString = pug.render(template);
  return parseDOMFromString(htmlString);
};
