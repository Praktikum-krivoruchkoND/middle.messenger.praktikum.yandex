import Block, { Props } from '../../../utils/block';
import getTemplate from './error.pug';

export type ErrorProps = {
  label: string;
} & Props;

export default class Error extends Block {
  constructor(props: ErrorProps) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): string {
    const { label } = this.props;
    return getTemplate({ label });
  }
}
