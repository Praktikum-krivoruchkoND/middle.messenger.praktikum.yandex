import Block, { Props } from '../../utils/block';
import getTemplate from './link.pug';

type LinkProps = {
    title: string;
    href: string;
} & Props;

export default class Button extends Block {
  constructor(props: LinkProps) {
    super(
      { ...props, classNames: ['_m-top-16'] },
      { debug: false, withInternalID: true },
    );
  }

  render(): string {
    const { title, href } = this.props;
    return getTemplate({ title, href });
  }
}
