const root = document.querySelector('#root');

export default (content: ChildNode): void => {
  if (root) {
    root.innerHTML = '';
    root.appendChild(content);
  }
};
