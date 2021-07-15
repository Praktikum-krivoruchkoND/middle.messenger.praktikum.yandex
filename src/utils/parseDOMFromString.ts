export default (pugRenderResult: string): ChildNode => {
  const parser = new DOMParser();
  const { body } = parser.parseFromString(pugRenderResult, 'text/html');
  return body.firstChild ? body.firstChild : body;
};
