import Block, { Props } from '../../utils/block';
import getTemplate from './button.pug';

type ButtonProps = {
    title: string;
    type?: string;
} & Props;

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render(): string {
    const { title, type } = this.props;
    return getTemplate({ title, type });
  }
}
