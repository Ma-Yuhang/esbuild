import React from 'react'
import ReactDOM from 'react-dom/client'
import Comp2 from './components/Comp2'
import Comp1 from './components/Comp1'
import txt1 from './assets/1.txt'
import './index.css'

const App = () => {
  console.log(txt1)
  return (
    <>
      <h1 className="title">App!!!!!!</h1>
      <Comp1></Comp1>
      <Comp2></Comp2>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App></App>
)
