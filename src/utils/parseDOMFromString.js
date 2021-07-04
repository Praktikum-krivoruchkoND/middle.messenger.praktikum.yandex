export default (pugRenderResult) => {
  const parser = new DOMParser();
  const { body } = parser.parseFromString(pugRenderResult, 'text/html');
  return body.firstChild;
};
