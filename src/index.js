import replaceRootContent from './utils/replaceRootContent';
import getPagesMenuPage from './pages/pages-menu';
import getLoginPage from './pages/login';

import './styles/index.scss';

const url = new URL(window.location.href)
const { pathname } = url;

switch (pathname) {
  case '/':
    const pagesMenuPage = getPagesMenuPage();
    replaceRootContent(pagesMenuPage);
    break;
  case '/login':
    const loginPage = getLoginPage();
    replaceRootContent(loginPage);
    break;
  case '/signup':
    console.log('TODO signup page')
    break;
  case '/chat':
    console.log('TODO chat page')
    break;
  case '/profile':
    console.log('TODO profile page')
    break;
  case '/404':
    console.log('TODO 404 page')
    break;
  case '/500':
    console.log('TODO 500 page')
    break;
  default:
    break;
}


