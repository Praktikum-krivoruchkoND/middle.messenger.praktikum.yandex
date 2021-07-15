const root = document.querySelector('#root');

export default (content: ChildNode) => {
  if (root) {
    root.innerHTML = '';
    root.appendChild(content);
  }
};
