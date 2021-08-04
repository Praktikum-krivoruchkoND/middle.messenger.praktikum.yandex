import Block, { Props } from '../../utils/block';
import Page from '../../components/page';
import FormItem from '../../components/formItem';
import Button from '../../components/button';
import Link from '../../components/link';
import containsSpecialSymbols from '../../utils/containsSpecialSymbols';

import './profile.scss';

const firstNameInput = new FormItem({
  name: 'firstName',
  label: 'First Name',
  placeholder: 'Enter First Name',
  error: 'Invalid First Name',
  type: 'text',
  validate: (value: string) => value.length > 0 && !containsSpecialSymbols(value),
});

const lastNameInput = new FormItem({
  name: 'lastName',
  label: 'Last Name',
  placeholder: 'Enter Last Name',
  error: 'Invalid Last Name',
  type: 'text',
  validate: (value: string) => value.length > 0 && !containsSpecialSymbols(value),
});

const emailInput = new FormItem({
  name: 'email',
  label: 'Email',
  placeholder: 'Enter Email',
  error: 'Invalid Email',
  type: 'email',
  validate: (value: string) => value.length > 0 && RegExp(/^\S+@\S+\.\S+$/).test(value),
});

const phoneNumberInput = new FormItem({
  name: 'phoneNumberInput',
  label: 'Phone Number',
  placeholder: 'Enter Phone Number',
  error: 'Invalid Phone Number',
  type: 'text',
  validate: (value: string) =>
    value.length > 0
    && RegExp(/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/)
      .test(value),
});

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
  title: 'Save Changes',
  type: 'submit',
});

const homeLink = new Link({
  title: 'Go Back',
  href: '/',
});

class Profile extends Block {
  constructor(props: Props) {
    super(
      { ...props, classNames: ['form-wrapper', 'profile-form-wrapper'] },
      { debug: true, withInternalID: true },
    );
  }

  render(): HTMLElement {
    const formContainer = document.createElement('form');
    formContainer.classList.add('form', 'profile-form');
    const title = document.createElement('h1');
    title.classList.add('profile-form__title');
    title.innerHTML = 'Edit Profile';
    formContainer.appendChild(title);
    formContainer.appendChild(firstNameInput.getContent());
    formContainer.appendChild(lastNameInput.getContent());
    formContainer.appendChild(emailInput.getContent());
    formContainer.appendChild(phoneNumberInput.getContent());
    formContainer.appendChild(loginInput.getContent());
    formContainer.appendChild(passwordInput.getContent());

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('form-controls__button-group');
    buttonGroup.appendChild(submitButton.getContent());
    buttonGroup.appendChild(homeLink.getContent());

    formContainer.appendChild(buttonGroup);
    return formContainer;
  }
}

const profileForm = new Profile({
  events: {
    submit: (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      firstNameInput.validate();
      lastNameInput.validate();
      emailInput.validate();
      phoneNumberInput.validate();
      loginInput.validate();
      passwordInput.validate();
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    },
  },
}).getContent();

export default (): Element => new Page({
  classNames: [
    'container',
    '_h-auto',
    '_min-h-100vh',
    '_flex',
    '_align-center',
    '_justify-center',
    'profile-container',
  ],
  wrapperTag: 'main',
  childNode: profileForm,
}).getContent();
