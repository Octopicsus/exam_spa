import { useDispatch, useSelector } from "react-redux"
import BackButton from "../../Buttons/BackButton"
import { RootState } from "../../../store/store"
import styled from "styled-components"
import { useState } from "react"
import { addItem, moneyAdapter, updateItem } from "../../../store/features/moneyHistorySlice"
import { getBalance } from "../../../utils/balanceCalc"
import { useLocation, useNavigate } from "react-router"
import getCategoryPath from "../../../utils/categoryPath"
import { CATEGORY } from "../../../enums/categoryTitles"
import colors from "../../../colors/colorsPalette"
import CategoryMoneyList from "../../CategoryMoneyList/CategoryMoneyList"


export default function MoneyInputPage() {
  const location = useLocation()
  const editItem = location.state?.item
  console.log(editItem)

  const [amount, setAmount] = useState(editItem ? String(editItem.amount) : "")

  const [actionTitle, setActionTitle] = useState(editItem ? editItem.title : "")

  const [img, setImg] = useState(editItem ? editItem.img || "" : "")

  const [date, setDate] = useState(
    editItem && editItem.date ? editItem.date : new Date().toISOString().slice(0, 10)
  )

  const dispatch = useDispatch()
  const category = useSelector((state: RootState) => state.category.category)
  const selectAll = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHistory
  ).selectAll
  const navigate = useNavigate()

  const items = useSelector(selectAll)
  const balance = getBalance(items)

  const pageTitle = category

  const numAmount = Number(amount)
  const isExpense = category === CATEGORY.EXPENSE
  const isBlocked = isExpense && numAmount > balance

  const handlePresetSelect = (title: string, img: string) => {
    setActionTitle(title)
    setImg(img)
  }

  const handleAdd = () => {
    if (numAmount > 0 && !isBlocked) {
      const now = new Date()
      const formattedDate = date
      let formattedTime = now.toTimeString().slice(0, 8)

      if (editItem) {
        if (editItem.date === formattedDate) {
          formattedTime = editItem.time
        }

        dispatch(updateItem({
          id: editItem.id,
          type: category,
          title: actionTitle,
          amount: numAmount,
          date: formattedDate,
          time: formattedTime,
          img: img
        }))

      } else {
        dispatch(addItem({
          id: Date.now(),
          type: category,
          title: actionTitle,
          amount: numAmount,
          date: formattedDate,
          time: formattedTime,
          img: img
        }))
      }

      setAmount("")
      setActionTitle("")
      setDate(new Date().toISOString().slice(0, 10))

      navigate(getCategoryPath(category))
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      handleAdd()
    }
  }

  return (
    <MoneyPageInput>
      <InputWrapper >
        <CategoryTypeTitle>{pageTitle}</CategoryTypeTitle>
        <Form onKeyDown={handleKeyDown}>
          <InputItem
            type="text"
            name="moneyTitleInput"
            value={actionTitle}
            onChange={event => setActionTitle(event.target.value)}
            placeholder="Title"
          />

          <InputItem
            type="number"
            name="moneyAmountInput"
            value={amount}
            onChange={event => setAmount(event.target.value)}
            placeholder="Amount"
          />

          <CategoryMoneyList onClick={handlePresetSelect}/>

          {editItem && (<InputItem
            type="date"
            name="moneyDateInput"
            lang="en"
            value={date}
            onChange={event => setDate(event.target.value)}
            $empty={!date}
          />
          )}

          <SubmitButton onClick={handleAdd}>
            {editItem ? "Edit" : "Add"}
          </SubmitButton>
        </Form>
      </InputWrapper>
      <BackButton />
    </MoneyPageInput >
  )
}



const CategoryTypeTitle = styled.h2`
text-align: left;
margin-bottom: 30px;
`

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

const Form = styled.form`
display: flex;
flex-direction: column;
`

const InputItem = styled.input<{ $empty?: boolean }>`
  margin-bottom: 10px;
  width: 90%;
  height: 28px;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 14px;
  border: none;
  background-color: #363636;
  color: ${({ $empty }) => ($empty ? "#808080" : "#ffffff")};

  &::placeholder {
    color: #808080;
    opacity: 1;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(50%) saturate(0%);
    margin-right: 10px;
    cursor: pointer;
  }
`

const SubmitButton = styled.button`
background-color: transparent;
color: ${colors.brandColor};
border: solid 1px  ${colors.brandColor};
padding: 8px 20px;
font-weight: bolder;
border-radius: 20px;
cursor: pointer;
margin-top: 30px;
`