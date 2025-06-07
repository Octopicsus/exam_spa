import { useDispatch, useSelector } from "react-redux"
import BackButton from "../../Buttons/BackButton"
import { RootState } from "../../../store/store"
import { deleteItem, moneyAdapter } from "../../../store/features/moneyHistorySlice"
import { useNavigate } from "react-router"
import getCategoryPath from "../../../utils/categoryPath"
import EditButton from "../../Buttons/EditButton"
import { LINK_ROUTES } from "../../../enums/routes"
import { formatAmount } from "../../../utils/balanceCalc"
import { useEffect, useState } from "react"

export default function MoneyItemPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useSelector((state: RootState) => state.selectedMoneyItem.id)
  const currency = useSelector((state: RootState) => state.currency)
  const [currencySign, setCurrencySign] = useState("zł")

  const selectedById = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHistory
  ).selectById

  const item = useSelector((state: RootState) => (id !== null ? selectedById(state, id) : null))

  useEffect(() => {
    const fetchCurrencySign = async () => {
      try {
        const response = await fetch('/data/currency.json')
        const data = await response.json()
        const selectedCurrency = data.currencies.find(
          (curr: any) => curr.code === currency.to
        )
        if (selectedCurrency) {
          setCurrencySign(selectedCurrency.sign)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchCurrencySign()
  }, [currency.to])

  function formatDate(dateString?: string) {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const handleDelete = () => {
    if (id !== null && item) {
      dispatch(deleteItem(id))
      navigate(getCategoryPath(item.type))
    }
  }

  const handleMoveToEditPage = () => {
    navigate(LINK_ROUTES.MONEY_INPUT, { state: { item } })
  }

  return (
    <>
      <h3>{item?.title}</h3>
      {item?.description && (
        <div>
          <p>{item.description}</p>
        </div>
        
      )}
      <div>
        <div>
          <p>Amount: {formatAmount(item?.amount || 0)} {currencySign}</p>
          {item?.originalCurrency && item.originalCurrency !== currency.to && (
            <p>Original: {formatAmount(item.originalAmount || 0)} {item.originalCurrency}</p>
          )}
        </div>
        <div>
          <p>Type: {item?.type}</p>
        </div>
        <div>
          <p>Date: {formatDate(item?.date)}</p>
        </div>
      </div>
      <button onClick={handleDelete}>Delete</button>
      <BackButton />
      <EditButton onClick={handleMoveToEditPage} />
    </>
  )
}