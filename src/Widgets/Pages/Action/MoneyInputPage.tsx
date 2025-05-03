import { useDispatch, useSelector } from "react-redux"
import BackButton from "../../Buttons/BackButton"
import { RootState } from "../../../store/store"
import styled from "styled-components"
import { useState } from "react"
import { addItem, moneyAdapter } from "../../../store/features/moneyHistorySlice"
import { getBalance } from "../../../utils/balanceCalc"
import { useNavigate } from "react-router"
import getCategoryPath from "../../../utils/categoryPath"

type Props = {}

export default function MoneyInputPage({ }: Props) {
  const dispatch = useDispatch()
  const category = useSelector((state: RootState) => state.category.category)
  const selectAll = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHisory
  ).selectAll
  const navigate = useNavigate()

  const items = useSelector(selectAll)
  const balance = getBalance(items)

  const pageTitle = category

  const [amount, setAmount] = useState("")
  const [actionTitle, setActionTitle] = useState("")

  const numAmount = Number(amount)
  const isExpense = category === "Expense"
  const isBlocked = isExpense && numAmount > balance

  const handleAdd = () => {
    if (numAmount > 0 && !isBlocked) {
      dispatch(addItem({
        id: Date.now(),
        type: category,
        title: actionTitle,
        amount: numAmount,
        date: new Date().toISOString()
      }))
      setAmount("")

      navigate(getCategoryPath(category))
    }
  }

  return (
    <MoneyPageInput>
      <InputWrapper>
        <h2>{pageTitle}</h2>

        <input
          type="text"
          name="moneyTitleInput"
          value={actionTitle}
          onChange={event => setActionTitle(event.target.value)}
          placeholder="Title"
        />

        <input
          type="number"
          name="moneyAmountInput"
          value={amount}
          onChange={event => setAmount(event.target.value)}
          placeholder="Amount"
        />

        <SubmitButton onClick={handleAdd}>Add</SubmitButton>
      </InputWrapper>

      <BackButton />
    </MoneyPageInput>
  )
}

const MoneyPageInput = styled.div`
height : 100vh;
position: relative;
display: flex;
justify-content: center;
align-items: center;
`

const InputWrapper = styled.div`
margin: 0 auto;
width: 300px;
display: flex;
flex-direction: column;
`

const SubmitButton = styled.button`
background-color: transparent;
color:  #ffb700;
border: solid 1px  #ffb700;
padding: 8px 20px;
font-weight: bolder;
border-radius: 20px;
cursor: pointer;
margin-top: 30px;
`