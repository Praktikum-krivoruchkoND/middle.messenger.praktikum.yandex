import Block, { Props } from '../../utils/block';
import getTemplate from './input.pug';

export type InputProps = {
    name: string,
    placeholder?: string;
    type?: string;
} & Props;

export default class Input extends Block {
  constructor(props: InputProps) {
    console.log('Input Block constructor call', { props });
    super(props, { debug: true, withInternalID: true });
  }

  render(): string {
    const { name, type, placeholder } = this.props;
    return getTemplate({ name, type, placeholder });
  }
}
