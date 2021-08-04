import Block, { Props } from '../../utils/block';
import getTemplate from './input.pug';

export type InputProps = {
    name: string,
    placeholder?: string;
    type?: string;
} & Props;

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): string {
    const { name, type, placeholder } = this.props;
    return getTemplate({ name, type, placeholder });
  }
}
