import parseDOMFromString from '../../utils/parseDOMFromString';
import compileTemplate from './profile.pug';

import userIcon from 'url:../../assets/icons/user-icon.svg';
import editIcon from 'url:../../assets/icons/edit-icon.svg';
import './profile.scss';

export default (): ChildNode => {
  const htmlString = compileTemplate({ userPhoto: userIcon, editIcon });
  return parseDOMFromString(htmlString);
};
