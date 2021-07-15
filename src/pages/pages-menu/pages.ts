import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './pages.pug';

export default () => {
  const htmlString = compileTemplate();
  return parseDOMFromString(htmlString);
};
