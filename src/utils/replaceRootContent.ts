const root = document.querySelector('#root');

export default (content: ChildNode) => {
  root.innerHTML = '';
  root.appendChild(content);
};
