import { Route, Routes, useNavigate } from 'react-router'
import styled from 'styled-components'
import Balance from './Widgets/Balance/Balance'
import CategoryMenu from './Widgets/Menu/CategoryMenu'
import IncomePage from './Widgets/Pages/Income/IncomePage'
import ExpensePage from './Widgets/Pages/Expense/ExpensePage'
import MoneyInputPage from './Widgets/Pages/Action/MoneyInputPage'
import MoneyItemPage from './Widgets/Pages/Action/MoneyItemPage'
import { useEffect } from 'react'
import { LINK_ROUTES } from './enums/routes'

const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(LINK_ROUTES.EXPENSE)
    }
  }, [navigate])

  const isActionPage =
    location.pathname === LINK_ROUTES.MONEY_INPUT ||
    location.pathname === LINK_ROUTES.MONEY_ITEM

  return (
    <AppContainer>
      {!isActionPage && (
        <>
          <Balance />
          <CategoryMenu />
        </>
      )}
      <Routes>
        <Route path={LINK_ROUTES.INCOME} element={<IncomePage />} />
        <Route path={LINK_ROUTES.EXPENSE} element={<ExpensePage />} />
        <Route path={LINK_ROUTES.MONEY_INPUT} element={<MoneyInputPage />} />
        <Route path={LINK_ROUTES.MONEY_ITEM} element={<MoneyItemPage />} />
      </Routes>
    </AppContainer>
  )
}

export default App