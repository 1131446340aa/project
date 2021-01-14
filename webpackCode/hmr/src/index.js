let render = () => {
  let title = require('./title.js')
  root.innerText = title
}
console.log(2121);
render()

if (module.hot) {
  module.hot.accept(['./title.js'], render)
}
