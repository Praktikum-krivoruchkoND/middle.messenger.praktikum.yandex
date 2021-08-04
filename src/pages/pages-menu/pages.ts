import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './pages.pug';

export default (): ChildNode => {
  const htmlString = compileTemplate();
  return parseDOMFromString(htmlString);
};
