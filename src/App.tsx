import { Route, Routes, useNavigate, useLocation } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LINK_ROUTES } from './enums/routes'
import styled from 'styled-components'
import Balance from './widgets/Balance/Balance'
import CategoryMenu from './widgets/Menu/CategoryMenu'
import IncomePage from './widgets/Pages/Income/IncomePage'
import ExpensePage from './widgets/Pages/Expense/ExpensePage'
import MoneyInputPage from './widgets/Pages/Action/MoneyInputPage'
import MoneyItemPage from './widgets/Pages/Action/MoneyItemPage'
import CustomCategoryPage from './widgets/Pages/Action/CustomCategoryPage'
import AuthPage from './widgets/Auth/AuthPage'
import UsersList from './widgets/Users/UsersList'
import ProtectedRoute from './widgets/Auth/ProtectedRoute'
import HeaderBlock from './widgets/Menu/Header/HeaderBlock'
import { RootState, AppDispatch } from './store/store'
import { verifyToken } from './store/features/authSlice'
import { fetchTransactions } from './store/features/moneyHistorySlice'
import Sidebar from './widgets/Menu/Sidebar/Sidebar'

const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  padding-top: 60px; /* Отступ для фиксированного хедера */
  padding-left: 60px; /* Отступ для сайдбара */
`

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, accessToken, isLoading, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    console.log('App: Checking authentication on load...', { accessToken: !!accessToken, isAuthenticated, hasUser: !!user });
    // Верифицируем токен если есть токен, но нет данных пользователя
    if (accessToken && (!user || !isAuthenticated)) {
      console.log('App: Verifying token...');
      dispatch(verifyToken())
    }
  }, [dispatch, accessToken, isAuthenticated, user])

  // Загружаем транзакции после успешной аутентификации
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      console.log('App: Loading transactions...');
      dispatch(fetchTransactions())
    }
  }, [dispatch, isAuthenticated, accessToken])

  useEffect(() => {
    if (window.location.pathname === '/' && isAuthenticated) {
      navigate(LINK_ROUTES.EXPENSE)
    }
  }, [navigate, isAuthenticated])

  const isActionPage =
    location.pathname === LINK_ROUTES.MONEY_INPUT ||
    location.pathname === LINK_ROUTES.MONEY_ITEM || 
    location.pathname === LINK_ROUTES.CUSTOM_CATEGORY ||
    location.pathname === '/users'

  if (isLoading) {
    return (
      <AppContainer>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          Loading...
        </div>
      </AppContainer>
    )
  }

  return (
    <div>
      {!isAuthenticated ? (
        <AuthPage />
      ) : (
        <AppContainer>
          <HeaderBlock />
          <Sidebar/>
          {!isActionPage && (
            <>
              <Balance />
              <CategoryMenu />
              {/* <SelectedCurrency /> */}
            </>
          )}
          <Routes>
            <Route path={LINK_ROUTES.INCOME} element={
              <ProtectedRoute>
                <IncomePage />
              </ProtectedRoute>
            } />
            <Route path={LINK_ROUTES.EXPENSE} element={
              <ProtectedRoute>
                <ExpensePage />
              </ProtectedRoute>
            } />
            <Route path={LINK_ROUTES.MONEY_INPUT} element={
              <ProtectedRoute>
                <MoneyInputPage />
              </ProtectedRoute>
            } />
            <Route path={LINK_ROUTES.MONEY_ITEM} element={
              <ProtectedRoute>
                <MoneyItemPage />
              </ProtectedRoute>
            } />
            <Route path={LINK_ROUTES.CUSTOM_CATEGORY} element={
              <ProtectedRoute>
                <CustomCategoryPage />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            } />
          </Routes>
        </AppContainer>
      )}
    </div>
  )
}

export default App