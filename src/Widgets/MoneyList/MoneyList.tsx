import { useDispatch, useSelector } from "react-redux"
import { moneyAdapter, MoneyItem } from "../../store/features/moneyHistorySlice"
import { RootState } from "../../store/store"
import MoneyActionItem from "./MoneyActionItem"
import styled from "styled-components"
import { setSelectedMoneyItemId } from "../../store/features/selectedMoneyActionSlice"
import { Link } from "react-router"
import { LINK_ROUTES } from "../../enums/routes"
import DateListItem from "./DateListItem"

export default function MoneyList() {
  const category = useSelector((state: RootState) => state.category.category)

  const selectAll = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHistory
  ).selectAll

  const moneyAction = useSelector(selectAll)

  const selectedCategory = moneyAction.filter((moneyAction: MoneyItem) => moneyAction.type === category).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`)
    const dateB = new Date(`${b.date}T${b.time}`)
    return dateB.getTime() - dateA.getTime()
  })

  const dispatch = useDispatch()

  return (
    <>
      <ul>
        {selectedCategory.map((moneyAction: MoneyItem) => {
          return (
            <List key={moneyAction.id}>
              <Link
                to={LINK_ROUTES.MONEY_ITEM}
                onClick={() => dispatch(setSelectedMoneyItemId(moneyAction.id))}
              >
                <DateListItem />
                <MoneyActionItem
                  title={moneyAction.title}
                  amount={moneyAction.amount}
                  date={moneyAction.date}
                  time={moneyAction.time}
                />
              </Link>
            </List>
          )
        })}
      </ul>
    </>
  )
}

const List = styled.li`
display: flex;
justify-content: center;
margin-top: 5px;
`



