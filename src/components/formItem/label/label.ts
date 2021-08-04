import Block, { Props } from '../../../utils/block';
import getTemplate from './label.pug';

export type LabelProps = {
  name: string,
  label: string;
} & Props;

export default class Label extends Block {
  constructor(props: LabelProps) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): string {
    const { name, label } = this.props;
    return getTemplate({ name, label });
  }
}
