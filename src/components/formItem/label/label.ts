import Block, { Props } from '../../../utils/block';
import getTemplate from './label.pug';

export type LabelProps = {
  name: string,
  label: string;
} & Props;

export default class Label extends Block {
  constructor(props: LabelProps) {
    console.log('Label Block constructor call', { props });
    super(props, { debug: true, withInternalID: true });
  }

  render(): string {
    const { name, label } = this.props;
    return getTemplate({ name, label });
  }
}
