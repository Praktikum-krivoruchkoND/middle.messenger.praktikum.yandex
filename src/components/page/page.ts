import Block, { Props } from '../../utils/block';

type PageProps = {
  wrapperTag: string;
  childNode: Element;
} & Props;

export default class Logo extends Block {
  constructor(props: PageProps) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): HTMLElement {
    const { wrapperTag, childNode } = this.props as PageProps;
    const container = document.createElement(wrapperTag);
    container.appendChild(childNode);
    return container;
  }
}
