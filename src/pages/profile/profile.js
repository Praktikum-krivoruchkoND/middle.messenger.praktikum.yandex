import { readFileSync } from 'fs';
import pug from 'pug';

import parseDOMFromString from '../../utils/parseDOMFromString';

import userIcon from '../../assets/icons/user-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';
import './profile.scss';

const template = readFileSync(__dirname + '/profile.pug', 'utf-8');

export default () => {
  const htmlString = pug.render(template, { userPhoto: userIcon, editIcon });
  return parseDOMFromString(htmlString);
};
