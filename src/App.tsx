import { BrowserRouter } from 'react-router'
import './App.css'
import { Balance } from './Widgets/Balance/Balance'
import {Header} from './Widgets/Header/Header'

function App() {


  return (
    <>
      <BrowserRouter>
      <Balance/>
      <Header/>

      </BrowserRouter>

    </>
  )
}

export default App
