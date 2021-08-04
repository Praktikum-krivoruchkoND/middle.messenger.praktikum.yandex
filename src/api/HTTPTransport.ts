/* eslint-disable @typescript-eslint/no-explicit-any */

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type IOption = {
  timeout?: number;
  data?: { [key: string]: string } | any;
  method?: METHODS;
  headers?: { [key: string]: string };
  withCredentials?: boolean;
}

function queryStringify(data: { [key: string]: string | number }): string {
  if (data === undefined || typeof data !== 'object') {
    throw new Error('error data');
  }

  const keys = Object.keys(data);
  return '?' + keys.reduce((acc, curr) => [...acc, `${curr}=${data[curr]}`], []).join('&');
}

export default class HTTPTransport {
  get(url: string, options: IOption = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post(url: string, options: IOption = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string, options: IOption = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string, options: IOption = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request(url: string, options: IOption, timeout = 5000): Promise<XMLHttpRequest> {
    const { data, method = METHODS.GET, headers = {} } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(method, isGet ? url + queryStringify(data) : url);
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
