import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Balance from './Widgets/Balance/Balance'
import CategoryMenu from './Widgets/Menu/CategoryMenu'
import IncomePage from './Widgets/Pages/Income/IncomePage'
import ExpensePage from './Widgets/Pages/Expense/ExpensePage'
import MoneyInputPage from './Widgets/Pages/Action/MoneyInputPage'
import MoneyItemPage from './Widgets/Pages/Action/MoneyItemPage'
import { useEffect } from 'react'
import { LinkRoutes } from './routes'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(LinkRoutes.EXPENSE)
    }
  }, [navigate])

  const isActionPage =
    location.pathname === LinkRoutes.MONEY_INPUT ||
    location.pathname === LinkRoutes.MONEY_ITEM

  return (
    <>
      {!isActionPage && (
        <>
          <Balance />
          <CategoryMenu />
        </>
      )}
      <Routes>
        <Route path={LinkRoutes.INCOME} element={<IncomePage />} />
        <Route path={LinkRoutes.EXPENSE} element={<ExpensePage />} />
        <Route path={LinkRoutes.MONEY_INPUT} element={<MoneyInputPage />} />
        <Route path={LinkRoutes.MONEY_ITEM} element={<MoneyItemPage />} />
      </Routes>
    </>
  )
}

export default App