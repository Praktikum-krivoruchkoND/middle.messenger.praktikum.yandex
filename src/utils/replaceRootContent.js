const root = document.querySelector('#root');

export default (content) => {
  root.innerHTML = '';
  root.appendChild(content);
};
