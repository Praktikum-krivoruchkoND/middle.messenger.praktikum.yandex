import Block, { Props } from '../../utils/block';
import getTemplate from './image.pug';

export default class Image extends Block {
  constructor(props: Props) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): string {
    const { src, alt, height, className } = this.props;
    return getTemplate({ src, alt, height, className });
  }
}
