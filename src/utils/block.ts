import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';
import parseDOMFromString from './parseDOMFromString';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type Props = {
  className?: string,
  events?: { [key: string]: (e: Event, ...args: any[]) => void },
  [key: string]: unknown,
}

export type Settings = {
  withInternalID?: boolean,
  debug?: boolean,
}

export default abstract class Block {
  private _element: HTMLElement;
  private _template: HTMLTemplateElement;
  // _fragment: DocumentFragment;
  private _meta: { tagName: string, props?: Props } & Settings;
  private _id: string;
  private eventBus: () => EventBus;
  props: Props;

  constructor(props: Props = {}, settings: Settings = {}) {
    this._meta = {
      tagName: 'template',
      props,
      withInternalID: settings.withInternalID,
      debug: settings.debug,
    };
    if (this._meta.withInternalID) {
      this._id = makeUUID();
    }

    if (this._meta.debug) {
      this.debug('constructor', { props, settings });
    }

    this.props = this._makePropsProxy({ ...props });
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    if (this._meta.debug) {
      this.debug('_registerEvents', { eventBus });
    }

    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private debug = (fnName: string, ...args: any[]) =>
    console.log(`%c ${fnName} call`, 'color: #bada55', ...args);

  private _createResources() {
    if (this._meta.debug) {
      this.debug('_createResources');
    }

    this._template = this._createDocumentElement();
  }

  private init() {
    if (this._meta.debug) {
      this.debug('init');
    }

    this._createResources();
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    if (this._meta.debug) {
      this.debug('_componentDidMount');
    }

    this.componentDidMount();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps?: Props): void {
    if (this._meta.debug) {
      this.debug('componentDidMount', { oldProps });
    }
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this._meta.debug) {
      this.debug('_componentDidUpdate', { oldProps, newProps });
    }

    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (this._meta.debug) {
      this.debug('componentDidUpdate', { oldProps, newProps });
    }
    // ! Compare oldProps and newProps - return false if equal

    return true;
  }

  setProps = (nextProps: Props): void => {
    if (this._meta.debug) {
      this.debug('setProps', { nextProps });
    }

    if (!nextProps) {
      return;
    }

    // ? what does it do
    Object.assign(this.props, nextProps);
  };

  _render(): void {
    if (this._meta.debug) {
      this.debug('!!! _render');
    }

    const block = this.render();
    console.log(block);

    this._element = parseDOMFromString(block);
    console.log(this._element);

    if (this._meta.withInternalID) {
      this._element.setAttribute('data-id', this._id);
    }

    this._removeEvents();
    this._template.innerHTML = '';
    this._template.appendChild(this._element);
    console.log(this._template);
    this._addEvents();
  }

  _addEvents(): void {
    if (this._meta.debug) {
      this.debug('_addEvents');
    }

    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(): void {
    if (this._meta.debug) {
      this.debug('_removeEvents');
    }

    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  abstract render(): string

  getContent(): Element {
    if (this._meta.debug) {
      this.debug('getContent', this._template.outerHTML);
    }

    const { firstElementChild } = this._template;
    if (firstElementChild) {
      return firstElementChild;
    }

    throw new Error('Can not get content');
  }

  _makePropsProxy(props: Props): Props {
    if (this._meta.debug) {
      this.debug('_makePropsProxy', { props });
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const { debug, _meta: { debug: allowDebug } } = self;

    return new Proxy(props, {
      get(target, prop: string) {
        if (allowDebug) {
          debug('Proxy get', { target, prop });
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (allowDebug) {
          debug('Proxy set', { target, prop, value });
        }

        target[prop] = value;
        self.eventBus().emit(EVENTS.FLOW_CDU, { ...target }, { ...target, [prop]: value });
        return true;
      },
      deleteProperty(target, prop: string) {
        if (allowDebug) {
          debug('Proxy deleteProperty', { target, prop });
        }

        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(): HTMLTemplateElement {
    const template = document.createElement('template');
    return template;
  }

  // show(): void {
  //   this.getContent().style.display = 'block';
  // }

  // hide(): void {
  //   this.getContent().style.display = 'none';
  // }
}
