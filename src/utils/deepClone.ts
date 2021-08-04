export default function deepCopy<T>(source: any): T {
  return Array.isArray(source)
    ? source.map((item) => deepCopy(item))
    : source instanceof Date
      ? new Date(source.getTime())
      : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
          const desc = Object.getOwnPropertyDescriptor(source, prop);
          if (desc) {
            Object.defineProperty(o, prop, desc);
            o[prop] = deepCopy(source[prop]);
          }

          return o;
        }, Object.create(Object.getPrototypeOf(source)))
        : source as T;
}
