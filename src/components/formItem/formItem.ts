import Block, { Props } from '../../utils/block';
import Label from './label';
import Input from '../input';
import ValidationError from './error';

export type FormItemProps = {
  name: string,
  label: string;
  placeholder: string;
  error: string;
  type: string;
  validate: (value: string) => boolean;
} & Props;

export default class FormItem extends Block {
  constructor(props: FormItemProps) {
    super(props, { debug: false, withInternalID: true });
  }

  render(): HTMLElement {
    const { name, error, label, placeholder, type, validate } = this.props as FormItemProps;
    const labelEl = new Label({ name, label });
    const errorEl = new ValidationError({ label: error });
    errorEl.hide();
    const inputEl = new Input({
      name,
      placeholder,
      type,
      events: {
        input: (e) => {
          const target = e.target as HTMLInputElement;
          console.log(target.value);
        },
        blur: (e) => {
          const target = e.target as HTMLInputElement;
          console.log(target.value);
          if (validate(target.value)) {
            errorEl.hide();
          } else {
            errorEl.show();
          }
        },
        focus: (e) => {
          const target = e.target as HTMLInputElement;
          console.log(target.value);
        },
      },
    });

    const container = document.createElement('div');
    container.appendChild(labelEl.getContent());
    container.appendChild(inputEl.getContent());
    container.appendChild(errorEl.getContent());
    return container;
  }
}
