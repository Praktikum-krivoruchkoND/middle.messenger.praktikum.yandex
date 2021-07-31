import replaceRootContent from './utils/replaceRootContent';
import getPagesMenuPage from './pages/pages-menu';
import getLoginPage from './pages/login';
import getSignUpPage from './pages/signup';
import get404Page from './pages/404-page';
import get500Page from './pages/500-page';
import getProfilePage from './pages/profile';
import getChatPage from './pages/chat';

import Button from './components/button';

import './styles/index.scss';

const { pathname } = window.location;

switch (pathname) {
  case '/': {
    const pagesMenuPage = getPagesMenuPage();
    replaceRootContent(pagesMenuPage);
    break;
  }

  case '/login': {
    const loginPage = getLoginPage();
    replaceRootContent(loginPage);
    break;
  }

  case '/signup': {
    const signUpPage = getSignUpPage();
    replaceRootContent(signUpPage);
    break;
  }

  case '/chat': {const chatPage = getChatPage();
    replaceRootContent(chatPage);
    break;
  }

  case '/profile': {const profilePage = getProfilePage();
    replaceRootContent(profilePage);
    break;
  }

  case '/404': {
    const _404Page = get404Page();
    replaceRootContent(_404Page);
    break;
  }

  case '/500': {
    const _500Page = get500Page();
    replaceRootContent(_500Page);
    break;
  }

  default: {
    replaceRootContent(get404Page());
    break;
  }
}

const button = new Button({
  title: 'My Button',
  type: 'sumbit',
  events: { click: () => console.log('hello') },
});
const root = document.querySelector('#root');
if (root) {
  root.appendChild(button.getContent());
}

setTimeout(() => button.setProps({
  title: 'My New Button',
  // type: 'button',
  // events: { click: () => console.log('bye') },
}), 1000);

