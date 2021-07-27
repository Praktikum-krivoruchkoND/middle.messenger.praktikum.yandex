import EventBus from './eventBus';

enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'component-did-mount',
    FLOW_CDU = 'component-did-update',
    FLOW_RENDER = 'render'
}

type Events = {
    [key: string]: {tagEvent: string, callback: ((...args: any[]) => unknown)}
}

type Props = {
    children?: { [key: string]: HTMLElement };
    tagName?: string;
    className?: string;
    attribute?: Record<string, string>;
    events?: Events;
    [key: string]: unknown;
}

export default abstract class Block {
  props: Props;
  protected _element: HTMLElement;
  private _meta: Props;
  private eventBus: () => EventBus;

  constructor(props = {}) {
    const eventBus = new EventBus();
    this._meta = props;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName = 'div', className = '', attribute = {} } = this._meta;
    this._element = this._createDocumentElement(tagName, className, attribute);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
    return this.element as HTMLElement;
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps === newProps) {
      return false;
    }

    return true;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  private _render() {
    this._removeEvents();
    const block = this.render();
    const { children } = this.props;
    this._element.innerHTML = block;
    if (children) {
      Object.keys(children).forEach((key) => {
        const _id = `#${key}`;
        const template = this._element.querySelector(_id);
        template?.replaceWith(children[key]);
      });
    }

    this._addEvents();
  }

  render(): string {
    return '';
  }

  getContent() {
    return this.element as HTMLElement;
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      const { tagEvent, callback } = events[eventName];
      const inputElement = this._element.querySelector(tagEvent);
      inputElement?.addEventListener(eventName, callback);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const { tagEvent, callback } = events[eventName];
      const inputElement = this._element.querySelector(tagEvent);
      inputElement?.removeEventListener(eventName, callback);
    });
  }

  private _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const result = target[prop];
        return typeof result === 'function' ? result.bind(target) : result;
      },
      set(target, prop: string, value) {
        target[prop] = value;
        self.eventBus().emit(EVENTS.FLOW_CDU, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(
    tagName: string, className: string, attribute: Record<string, string>,
  ): HTMLElement {
    const el = document.createElement(tagName);
    if (attribute) {
      Object.keys(attribute).forEach((attr) => {
        el.setAttribute(attr, attribute[attr]);
      });
    }

    if (className) {
      el.classList.add(className);
    }

    return el;
  }
}
