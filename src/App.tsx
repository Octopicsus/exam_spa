
import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import Balance from './Widgets/Balance/Balance'
import CategoryMenu from './Widgets/Menu/CategoryMenu'
import IncomePage from './Widgets/Pages/Income/IncomePage'
import ExpensePage from './Widgets/Pages/Expense/ExpensePage'
import MoneyInputPage from './Widgets/Pages/Action/MoneyInputPage'
import MoneyItemPage from './Widgets/Pages/Action/MoneyItemPage'

function App() {
  const location = useLocation()

  if (location.pathname === "/moneyinputpage") {
    return <MoneyInputPage />
  }

  if (location.pathname === "/moneyitempage") {
    return <MoneyItemPage />
  }

  return (
    <>
      <Balance />
      <CategoryMenu />

      <Routes>
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/moneyinputpage" element={<MoneyInputPage />} />
        <Route path="/moneyitempage" element={<MoneyItemPage />} />
      </Routes>
    </>
  )
}

export default App
