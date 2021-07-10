import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './404-page.pug';

import './404-page.scss';

export default () => {
  const htmlString = compileTemplate({ cachePrevent: Date.now() });
  return parseDOMFromString(htmlString);
};
