import Block, { Props } from '../../utils/block';
import Page from '../../components/page';
import Image from '../../components/image';
import Link from '../../components/link';

import './404-page.scss';

const image = new Image({
  src: `https://cataas.com/cat?${Date.now()}`,
  alt: 'cat image"',
  height: '384px',
  className: 'error-info__image',
});

const backLink = new Link({
  title: 'Go Home',
  href: '/',
});

class PageContent extends Block {
  constructor(props: Props) {
    super(
      { ...props,
        classNames: ['container', '_full-height', '_flex', '_align-center', '_justify-center'],
      },
      { debug: true, withInternalID: true },
    );
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('error-info');

    const title = document.createElement('h1');
    title.classList.add('error-info__title');
    title.innerText = 'WHOOOPS';

    const status = document.createElement('h2');
    status.classList.add('error-info__status');
    status.innerText = '404';

    const message = document.createElement('h2');
    message.classList.add('error-info__message');
    message.innerText = 'Page not found';

    container.appendChild(title);
    container.appendChild(status);
    container.appendChild(message);
    container.appendChild(backLink.getContent());

    return container;
  }
}

const pageContent = new PageContent({}).getContent();
pageContent.appendChild(image.getContent());

export default (): Element => new Page({
  wrapperTag: 'main',
  childNode: pageContent,
}).getContent();
