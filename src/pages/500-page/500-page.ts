import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './500-page.pug';

import './500-page.scss';

export default (): ChildNode => {
  const htmlString = compileTemplate({ cachePrevent: Date.now() });
  return parseDOMFromString(htmlString);
};
