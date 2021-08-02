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
  private currValue: string;
  private labelEl: Label;
  private errorEl: ValidationError;
  private inputEl: Input;

  constructor(props: FormItemProps) {
    super(props, { debug: false, withInternalID: true });
    this.currValue = '';
  }

  validate(): void {
    const { validate } = this.props as FormItemProps;
    if (validate(this.currValue)) {
      this.errorEl.hide();
    } else {
      this.errorEl.show();
    }
  }

  render(): HTMLElement {
    const { name, error, label, placeholder, type, validate } = this.props as FormItemProps;
    this.labelEl = new Label({ name, label });
    this.errorEl = new ValidationError({ label: error });
    this.errorEl.hide();
    this.inputEl = new Input({
      name,
      placeholder,
      type,
      events: {
        input: (e) => {
          const target = e.target as HTMLInputElement;
          this.currValue = target.value;
        },
        blur: (e) => {
          const target = e.target as HTMLInputElement;
          if (validate(target.value)) {
            this.errorEl.hide();
          } else {
            this.errorEl.show();
          }
        },
        // focus: (e) => {
        //   const target = e.target as HTMLInputElement;
        // },
      },
    });

    const container = document.createElement('div');
    container.classList.add('form-controls');
    container.appendChild(this.labelEl.getContent());
    container.appendChild(this.inputEl.getContent());
    container.appendChild(this.errorEl.getContent());
    return container;
  }
}
