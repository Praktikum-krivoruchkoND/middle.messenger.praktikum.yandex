import Block, { Props } from '../../utils/block';
import getTemplate from './input.pug';
import getErrorTemplate from './error.pug';
import validation from '../../utils/validation';

type ImportProps = {
    type: string;
    name: string;
    value: string;
    label: string;
    placeholder?: string;
    tagName?: string;
    className?: string;
    errorBlock?: Block;
} & Props;

type ErrorProps = {
  text: string;
  className?: string;
} & Props

class Error extends Block {
  constructor(props: ErrorProps) {
    super({ ...props });
  }

  render(): string {
    const { text } = this.props;
    return getErrorTemplate({ text });
  }
}

export default class Input extends Block {
    props: ImportProps;
    constructor(props: ImportProps) {
      const events = {
        blur: {
          tagEvent: 'input',
          callback: (e: Event) => {
            this.checkInput(e, this.props.type);
          },
        },
        focus: {
          tagEvent: 'input',
          callback: () => {
            this.disableErrors();
          },
        },
      };
      const errorBlock = new Error({ text: '', className: 'error-grid' });
      super({
        ...props,
        events,
        errorBlock,
        children: { error: errorBlock.getContent() },
        tagName: 'section',
        className: 'input',
      });
    }

    checkInput(e: Event, type: string): void {
      const result = validation((e.target as HTMLInputElement).value, type);
      if (this.props.errorBlock) {
        this.props.errorBlock.setProps({ text: result?.messageError });
      }
    }

    disableErrors(): void {
      if (this.props.errorBlock) {
        this.props.errorBlock.setProps({ text: '' });
      }
    }

    render(): string {
      const { type, name, value, label, placeholder } = this.props;
      return getTemplate({
        type,
        name,
        value,
        label,
        placeholder,
      });
    }
}
