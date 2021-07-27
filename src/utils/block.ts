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
  __id?: string;
  [key: string]: unknown,
}
export type Settings = {
  withInternalID?: boolean,
  debug?: boolean,
}

export default abstract class Block {
  _element: HTMLElement;
  // _fragment: DocumentFragment;
  _meta: { tagName: string, props?: Props } & Settings;
  _id: string;
  props: Props;
  eventBus: () => EventBus;

  constructor(props: Props = {}, settings: Settings = {}) {
    this._meta = {
      tagName: 'template',
      props,
      withInternalID: settings.withInternalID,
      debug: settings.debug,
    };
    if (this._meta.withInternalID) {
      // Генерируем уникальный UUID V4
      this._id = makeUUID();
    }

    if (this._meta.debug) {
      this.debug('constructor', { props, settings });
    }

    this.props = this._makePropsProxy({ ...props, __id: this._id });
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

    const { tagName } = this._meta;
    // this._fragment = this._createDocumentFragment();
    this._element = this._createDocumentElement(tagName);
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

    return true;
  }

  setProps = (nextProps: Props): void => {
    if (this._meta.debug) {
      this.debug('setProps', { nextProps });
    }

    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _render(): void {
    if (this._meta.debug) {
      this.debug('_render');
    }

    const block = this.render();
    const element = parseDOMFromString(block);
    // Удалить старые события через removeEventListener
    // this._removeEvents();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напиши свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы превращать из возвращать из compile DOM-ноду
    // this._element.innerHTML = block;

    console.log({ block, element, _element: this._element });

    // this._fragment.appendChild(element);
    this._element.appendChild(element);
    // Навесить новые события через addEventListener
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

  getContent(): HTMLElement {
    if (this._meta.debug) {
      this.debug('getContent');
    }

    return this._element;
  }

  _makePropsProxy(props: Props): Props {
    if (this._meta.debug) {
      this.debug('_makePropsProxy', { props });
    }

    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
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
        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(EVENTS.FLOW_CDU, { ...target }, target);
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

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  // _createDocumentFragment(): DocumentFragment {
  //   // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
  //   // const element = document.createElement(tagName);
  //   const fragment = document.createDocumentFragment();
  //   //  element.setAttribute('data-id', this._id);
  //   return fragment;
  // }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
