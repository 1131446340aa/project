import React from 'react'
import ReactDom from 'react-dom'
const App = React.lazy(() => import('remote/app'))
// import App from './app'
ReactDom.render(
  <React.Suspense fallback="ww">
    <App />
  </React.Suspense>,
  document.getElementById('app')
)
