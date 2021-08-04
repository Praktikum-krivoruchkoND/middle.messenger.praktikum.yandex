import Block, { Props } from '../../utils/block';
import Page from '../../components/page';
import FormItem from '../../components/formItem';
import Button from '../../components/button';
import Link from '../../components/link';
import Logo from '../../components/logo/logo';
import containsSpecialSymbols from '../../utils/containsSpecialSymbols';

import './login.scss';

const logo = new Logo({});

const loginInput = new FormItem({
  name: 'login',
  label: 'Login',
  placeholder: 'Enter Login',
  error: 'Invalid login',
  type: 'text',
  validate: (value: string) => value.length > 4 && !containsSpecialSymbols(value),
});

const passwordInput = new FormItem({
  name: 'password',
  label: 'Password',
  placeholder: 'Enter Password',
  error: 'Invalid password',
  type: 'password',
  validate: (value: string) => value.length > 4 && !containsSpecialSymbols(value),
});

const submitButton = new Button({
  title: 'Log In',
  type: 'submit',
});

const signupLink = new Link({
  title: 'Sign Up',
  href: '/signup',
});

class Login extends Block {
  constructor(props: Props) {
    super(
      { ...props, classNames: ['form-wrapper', 'login-form-wrapper'] },
      { debug: false, withInternalID: true },
    );
  }

  render(): HTMLElement {
    const formContainer = document.createElement('form');
    formContainer.classList.add('form', 'login-form');
    formContainer.appendChild(logo.getContent());
    formContainer.appendChild(loginInput.getContent());
    formContainer.appendChild(passwordInput.getContent());

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('form-controls__button-group');
    buttonGroup.appendChild(submitButton.getContent());
    buttonGroup.appendChild(signupLink.getContent());

    formContainer.appendChild(buttonGroup);
    return formContainer;
  }
}

const loginForm = new Login({
  events: {
    submit: (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      loginInput.validate();
      passwordInput.validate();
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    },
  },
}).getContent();

export default (): Element => new Page({
  classNames: ['container', '_h-auto', '_min-h-100vh', '_flex', '_align-center', '_justify-center'],
  wrapperTag: 'main',
  childNode: loginForm,
}).getContent();
