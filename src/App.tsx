
import { Route, Routes } from 'react-router'
import './App.css'
import Balance  from './Widgets/Balance/Balance'
import Header from './Widgets/Header/Header'
import IncomePage from './Widgets/Pages/Income/IncomePage'
import ExpensePage from './Widgets/Pages/Expense/ExpensePage'

function App() {

  return (
    <>
      <Balance/>
      <Header/>
      <Routes>
        <Route path="/income" element={<IncomePage/>}/>
        <Route path="/expense" element={<ExpensePage/>}/>
      </Routes>

      

    </>
  )
}

export default App
