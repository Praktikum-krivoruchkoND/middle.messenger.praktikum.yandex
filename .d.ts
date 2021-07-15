declare module 'url:*' {
  const template: string;
  export default template;
}

declare module '*.pug' {
  function compileTemplate( locales?: object ): string;
  export default compileTemplate
}