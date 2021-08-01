import Block, { Props } from '../../utils/block';
import getTemplate from './logo.pug';
import logoIcon from 'url:../../assets/icons/logo-icon.svg';

export default class Logo extends Block {
  constructor(props: Props) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): string {
    return getTemplate({ logoSrc: logoIcon });
  }
}
