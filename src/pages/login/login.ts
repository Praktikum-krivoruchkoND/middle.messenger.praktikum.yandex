import Block, { Props } from '../../utils/block';
import FormItem from '../../components/formItem';
import Button from '../../components/button';
import Link from '../../components/link';
import Logo from '../../components/logo/logo';
import containsSpecialSymbols from '../../utils/containsSpecialSymbols';

// import parseDOMFromString from '../../utils/parseDOMFromString';
// import compileTemplate from './login.pug';

// import logoIcon from 'url:../../assets/icons/logo-icon.svg';
// import './login.scss';

// export default (): ChildNode => {
//   console.log(logoIcon);
//   const htmlString = compileTemplate({ logoSrc: logoIcon });
//   return parseDOMFromString(htmlString);
// };

const logo = new Logo({});

const loginInput = new FormItem({
  name: 'login',
  label: 'Login',
  placeholder: 'Your Login',
  error: 'Invalid login',
  type: 'text',
  validate: (value: string) => value.length > 4 && !containsSpecialSymbols(value),
});

const passwordInput = new FormItem({
  name: 'password',
  label: 'Password',
  placeholder: 'Your Password',
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
  href: '/signup'
});

class Login extends Block {
  constructor(props: Props) {
    super(props, { debug: true, withInternalID: true });
  }

  render(): HTMLElement {
    const formContainer = document.createElement('form');
    formContainer.setAttribute('name', 'login');
    formContainer.appendChild(logo.getContent());
    formContainer.appendChild(loginInput.getContent());
    formContainer.appendChild(passwordInput.getContent());
    formContainer.appendChild(submitButton.getContent());
    formContainer.appendChild(signupLink.getContent());
    return formContainer;
  }
}

export default (): Element => new Login({
  events: {
    submit: (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      formData.forEach((value, key) => console.log(`${key}: ${value}`));
    },
  },
}).getContent();
